CREATE TABLE `collection_members` (
	`pokemon_id` integer NOT NULL,
	`collector` text NOT NULL,
	`updated_at` integer NOT NULL,
	PRIMARY KEY(`pokemon_id`, `collector`)
);
