-- D1 logical export for the Pokemon sticker collection.
-- Exported at 2026-08-26T06:07:38.576Z
CREATE TABLE IF NOT EXISTS collection_members (
  pokemon_id INTEGER NOT NULL,
  collector TEXT NOT NULL,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (pokemon_id, collector)
);
DELETE FROM collection_members;
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (1, '송', 1786460084);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (2, '주', 1786442314);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (3, '수', 1786439601);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (4, '송', 1786460089);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (6, '수', 1786439598);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (7, '수', 1786575910);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (9, '수', 1786439596);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (11, '송', 1786460094);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (11, '수', 1787548839);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (13, '수', 1786439593);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (14, '수', 1786439591);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (15, '송', 1786487637);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (15, '수', 1786439589);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (16, '수', 1787288310);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (16, '주', 1786442484);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (17, '송', 1786487591);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (17, '수', 1786439585);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (18, '수', 1786439582);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (19, '수', 1786439608);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (20, '수', 1786439611);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (21, '수', 1786439578);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (23, '수', 1786439574);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (24, '송', 1786460110);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (25, '수', 1786439615);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (26, '주', 1786442423);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (27, '수', 1787025682);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (28, '수', 1786439570);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (29, '주', 1786442448);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (30, '수', 1786439572);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (31, '수', 1786439567);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (34, '송', 1786460116);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (36, '수', 1786439561);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (39, '송', 1786440198);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (40, '수', 1786439559);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (41, '주', 1786442471);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (43, '수', 1787203770);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (45, '송', 1786460125);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (47, '수', 1786439554);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (48, '수', 1786686510);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (49, '수', 1786439551);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (50, '송', 1786487577);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (52, '송', 1786487618);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (54, '송', 1786460133);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (54, '수', 1787640070);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (56, '수', 1786439547);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (57, '송', 1786487643);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (59, '용', 1786462622);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (61, '송', 1786487648);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (61, '수', 1787659771);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (63, '수', 1786439535);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (64, '주', 1786442365);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (65, '수', 1786439539);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (71, '수', 1787548854);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (71, '용', 1786462664);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (73, '수', 1786439532);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (76, '수', 1786439370);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (77, '수', 1786439372);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (77, '주', 1786442374);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (82, '수', 1786439525);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (84, '송', 1786460165);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (84, '수', 1786439523);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (85, '송', 1786460171);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (85, '수', 1786439528);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (86, '수', 1787294337);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (89, '수', 1786439503);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (91, '수', 1787659776);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (92, '송', 1786460179);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (92, '수', 1786439518);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (93, '수', 1786439509);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (94, '수', 1786439512);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (95, '수', 1786439511);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (98, '수', 1787025687);
INSERT INTO collection_members (pokemon_id, collector, updated_at) VALUES (98, '주', 1786442390);

