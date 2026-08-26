type Collector = "수" | "주" | "송" | "용";

async function getDatabase() {
  const { env } = await import("cloudflare:workers");
  return env.DB;
}

async function ensureSchema() {
  const database = await getDatabase();
  await database.prepare(`CREATE TABLE IF NOT EXISTS collection_members (
    pokemon_id INTEGER NOT NULL,
    collector TEXT NOT NULL,
    updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
    PRIMARY KEY (pokemon_id, collector)
  )`).run();
  const legacyTable = await database.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'collection'").first<{ name: string }>();
  if (legacyTable) {
    await database.prepare(`INSERT OR IGNORE INTO collection_members (pokemon_id, collector, updated_at)
      SELECT pokemon_id, collector, updated_at FROM collection`).run();
    await database.prepare("DROP TABLE collection").run();
  }
}

async function getCollectors(pokemonId: number) {
  const database = await getDatabase();
  const result = await database.prepare("SELECT collector FROM collection_members WHERE pokemon_id = ? ORDER BY updated_at, collector")
    .bind(pokemonId)
    .all<{ collector: Collector }>();
  return result.results.map((row) => row.collector);
}

export async function GET() {
  try {
    await ensureSchema();
    const database = await getDatabase();
    const result = await database.prepare("SELECT pokemon_id, collector FROM collection_members ORDER BY pokemon_id, updated_at, collector").all<{ pokemon_id: number; collector: Collector }>();
    const collection: Record<number, Collector[]> = {};
    for (const row of result.results) {
      (collection[row.pokemon_id] ??= []).push(row.collector);
    }
    return Response.json({ collection }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "수집 정보를 불러오지 못했습니다." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { pokemonId?: number; collector?: Collector };
    const pokemonId = Number(body.pokemonId);
    if (!Number.isInteger(pokemonId) || pokemonId < 1 || pokemonId > 100 || !(["수", "주", "송", "용"] as const).includes(body.collector as Collector)) {
      return Response.json({ error: "올바르지 않은 수집 정보입니다." }, { status: 400 });
    }
    await ensureSchema();
    const database = await getDatabase();
    await database.prepare(`INSERT OR IGNORE INTO collection_members (pokemon_id, collector, updated_at)
      VALUES (?, ?, unixepoch())`)
      .bind(pokemonId, body.collector)
      .run();
    const collectors = await getCollectors(pokemonId);
    return Response.json({ pokemonId, collectors });
  } catch {
    return Response.json({ error: "수집 정보를 저장하지 못했습니다." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = (await request.json()) as { pokemonId?: number; collector?: Collector };
    const pokemonId = Number(body.pokemonId);
    if (!Number.isInteger(pokemonId) || pokemonId < 1 || pokemonId > 100 || !(["수", "주", "송", "용"] as const).includes(body.collector as Collector)) {
      return Response.json({ error: "올바르지 않은 수집 정보입니다." }, { status: 400 });
    }
    await ensureSchema();
    const database = await getDatabase();
    await database.prepare("DELETE FROM collection_members WHERE pokemon_id = ? AND collector = ?")
      .bind(pokemonId, body.collector)
      .run();
    const collectors = await getCollectors(pokemonId);
    return Response.json({ pokemonId, collectors });
  } catch {
    return Response.json({ error: "수집 등록을 취소하지 못했습니다." }, { status: 500 });
  }
}
