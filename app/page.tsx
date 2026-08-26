"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getPokemon, POKEMON } from "./pokemon-data";

type Collector = "수" | "주" | "송" | "용";
type Collection = Record<number, Collector[]>;

const USERS: Collector[] = ["수", "주", "송", "용"];

export default function Home() {
  const [collection, setCollection] = useState<Collection>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [actionCard, setActionCard] = useState<number | null>(null);
  const [collector, setCollector] = useState<Collector>("수");
  const [filter, setFilter] = useState<"all" | "collected" | "missing">("all");
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [removeTarget, setRemoveTarget] = useState<{ pokemonId: number; collector: Collector } | null>(null);
  const [connected, setConnected] = useState(true);

  const loadCollection = useCallback(async () => {
    try {
      const response = await fetch("/api/collection", { cache: "no-store" });
      if (!response.ok) throw new Error("failed");
      const data = (await response.json()) as { collection: Collection };
      setCollection(data.collection);
      setConnected(true);
    } catch {
      setConnected(false);
    }
  }, []);

  useEffect(() => {
    loadCollection();
    const timer = window.setInterval(loadCollection, 3000);
    return () => window.clearInterval(timer);
  }, [loadCollection]);

  const collectedCount = Object.values(collection).filter((owners) => owners.length > 0).length;
  const progress = collectedCount;
  const visibleIds = useMemo(
    () =>
      POKEMON.map((pokemon) => pokemon.index).filter((id) => {
        const collected = (collection[id]?.length ?? 0) > 0;
        if (filter === "collected") return collected;
        if (filter === "missing") return !collected;
        return true;
      }),
    [collection, filter],
  );

  const openCollectorModal = (pokemonId: number) => {
    const owners = collection[pokemonId] ?? [];
    const firstAvailable = USERS.find((user) => !owners.includes(user));
    if (!firstAvailable) return;
    setCollector(firstAvailable);
    setActionCard(null);
    setSelected(pokemonId);
  };

  const handleCardClick = (pokemonId: number) => {
    const owners = collection[pokemonId] ?? [];
    if (owners.length === 0) openCollectorModal(pokemonId);
    else setActionCard((current) => (current === pokemonId ? null : pokemonId));
  };

  const save = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const response = await fetch("/api/collection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pokemonId: selected, collector }),
      });
      if (!response.ok) throw new Error("failed");
      const data = (await response.json()) as { collectors: Collector[] };
      setCollection((current) => ({ ...current, [selected]: data.collectors }));
      setSelected(null);
      setConnected(true);
    } catch {
      setConnected(false);
    } finally {
      setSaving(false);
    }
  };

  const removeCollector = async () => {
    if (!removeTarget) return;
    setRemoving(true);
    try {
      const response = await fetch("/api/collection", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(removeTarget),
      });
      if (!response.ok) throw new Error("failed");
      const data = (await response.json()) as { collectors: Collector[] };
      setCollection((current) => {
        const next = { ...current };
        if (data.collectors.length === 0) delete next[removeTarget.pokemonId];
        else next[removeTarget.pokemonId] = data.collectors;
        return next;
      });
      setRemoveTarget(null);
      setConnected(true);
    } catch {
      setConnected(false);
    } finally {
      setRemoving(false);
    }
  };

  const selectedOwners = selected ? collection[selected] ?? [] : [];
  const selectedPokemon = selected ? getPokemon(selected) : null;
  const removePokemon = removeTarget ? getPokemon(removeTarget.pokemonId) : null;

  return (
    <main>
      <header className="hero">
        <div className="hero-inner">
          <div className="eyebrow"><span className="ball" aria-hidden="true" /> 30TH ANNIVERSARY</div>
          <h1>우리의 띠부씰 도감</h1>
          <p className="hero-copy">수 · 주 · 송 · 용, 넷이 함께 채우는 포켓몬 100종 컬렉션</p>

          <div className="progress-card">
            <div className="progress-top">
              <div><strong>{collectedCount}</strong><span> / 100 수집</span></div>
              <span className="percent">{progress}%</span>
            </div>
            <div className="progress-track" aria-label={`수집률 ${progress}%`}>
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="legend">
              {USERS.map((user) => (
                <span key={user}><i className={`user-dot user-${user}`} />{user} {Object.values(collection).filter((owners) => owners.includes(user)).length}</span>
              ))}
              <span className={`sync ${connected ? "online" : "offline"}`}><i />{connected ? "동기화 중" : "연결 확인 중"}</span>
            </div>
          </div>
        </div>
      </header>

      <section className="collection-section">
        <div className="section-head">
          <div>
            <p className="section-kicker">COLLECTION</p>
            <h2>포켓몬 100종</h2>
          </div>
          <div className="filters" role="group" aria-label="도감 필터">
            {([['all', '전체'], ['missing', '미수집'], ['collected', '수집완료']] as const).map(([value, label]) => (
              <button key={value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>
            ))}
          </div>
        </div>

        <div className="grid">
          {visibleIds.map((id) => {
            const pokemon = getPokemon(id);
            const owners = collection[id] ?? [];
            const isCollected = owners.length > 0;
            const allRegistered = owners.length === USERS.length;
            return (
              <article
                className={`pokemon-card ${isCollected ? "is-collected" : ""}`}
                key={id}
                role="button"
                tabIndex={0}
                onClick={() => handleCardClick(id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleCardClick(id);
                  }
                }}
                aria-label={`도감번호 ${pokemon.wikiNumber} ${pokemon.name}, ${isCollected ? `${owners.join(", ")} 수집 완료, 눌러서 추가 등록` : "미수집, 눌러서 수집"}`}
              >
                <span className="card-title"><span className="number">No.{pokemon.wikiNumber}</span><span className="pokemon-name">{pokemon.name}</span></span>
                <span className="image-wrap">
                  <img src={`/pokemon/${String(id).padStart(3, "0")}.png`} alt={`${pokemon.name}, 도감번호 ${pokemon.wikiNumber}`} />
                  {!isCollected && <span className="inactive-layer"><span>?</span></span>}
                  {actionCard === id && (
                    <span className="action-layer" onClick={(event) => event.stopPropagation()}>
                      <button onClick={() => openCollectorModal(id)} disabled={allRegistered}>{allRegistered ? "모두 등록됨" : "추가 등록"}</button>
                      <button className="cancel-action" onClick={() => setActionCard(null)}>취소</button>
                    </span>
                  )}
                </span>
                <span className={`card-foot ${isCollected ? "has-badges" : ""}`}>
                  {isCollected ? owners.map((owner) => (
                    <button
                      className={`owner-badge badge-${owner}`}
                      key={owner}
                      aria-label={`${pokemon.name}에서 ${owner} 수집 등록 취소`}
                      onClick={(event) => {
                        event.stopPropagation();
                        setActionCard(null);
                        setRemoveTarget({ pokemonId: id, collector: owner });
                      }}
                    >{owner}</button>
                  )) : "아직 만나지 못했어요"}
                </span>
              </article>
            );
          })}
        </div>
        {visibleIds.length === 0 && <div className="empty">이 조건에 해당하는 포켓몬이 없어요.</div>}
      </section>

      {selected !== null && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => !saving && setSelected(null)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="collect-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="close" aria-label="닫기" onClick={() => setSelected(null)}>×</button>
            <div className="modal-preview"><img src={`/pokemon/${String(selected).padStart(3, "0")}.png`} alt="" /></div>
            <p className="modal-number">No.{selectedPokemon?.wikiNumber} <strong>{selectedPokemon?.name}</strong></p>
            <h2 id="collect-title">{selectedOwners.length > 0 ? "수집한 사람을 추가해요" : "새 포켓몬을 발견했어요!"}</h2>
            <p className="modal-copy">누가 이 띠부씰을 수집했나요?</p>
            <label className="select-label">
              <span>수집한 사람</span>
              <select value={collector} onChange={(event) => setCollector(event.target.value as Collector)}>
                {USERS.map((user) => <option value={user} key={user} disabled={selectedOwners.includes(user)}>{user}{selectedOwners.includes(user) ? " · 등록됨" : ""}</option>)}
              </select>
            </label>
            <button className="save-button" onClick={save} disabled={saving}>{saving ? "저장 중..." : "도감에 저장"}</button>
          </div>
        </div>
      )}

      {removeTarget !== null && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => !removing && setRemoveTarget(null)}>
          <div className="modal confirm-modal" role="alertdialog" aria-modal="true" aria-labelledby="remove-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className={`confirm-badge badge-${removeTarget.collector}`}>{removeTarget.collector}</div>
            <p className="modal-number">No.{removePokemon?.wikiNumber} <strong>{removePokemon?.name}</strong></p>
            <h2 id="remove-title">수집 등록을 취소할까요?</h2>
            <p className="modal-copy"><strong>{removeTarget.collector}</strong>의 수집 배지가 이 카드에서 삭제됩니다.</p>
            <div className="confirm-actions">
              <button className="keep-button" onClick={() => setRemoveTarget(null)} disabled={removing}>돌아가기</button>
              <button className="remove-button" onClick={removeCollector} disabled={removing}>{removing ? "삭제 중..." : "배지 삭제"}</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
