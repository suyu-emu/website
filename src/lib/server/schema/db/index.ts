import { DataSource } from "typeorm";

export const db = new DataSource({
	type: "better-sqlite3",
	database: "db.sqlite",
});
