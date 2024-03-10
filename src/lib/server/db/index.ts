import { DataSource } from "typeorm";
import { SuyuUser } from "../schema";

export const db = new DataSource({
	type: "better-sqlite3",
	database: "db.sqlite",
	entities: [SuyuUser],
	synchronize: true,
	subscribers: [],
	migrations: [],
});
