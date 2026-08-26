import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const legacyCollection = sqliteTable("collection", {
  pokemonId: integer("pokemon_id").primaryKey(),
  collector: text("collector").notNull(),
  updatedAt: integer("updated_at").notNull(),
});

export const collectionMembers = sqliteTable("collection_members", {
  pokemonId: integer("pokemon_id").notNull(),
  collector: text("collector").notNull(),
  updatedAt: integer("updated_at").notNull(),
}, (table) => [primaryKey({ columns: [table.pokemonId, table.collector] })]);
