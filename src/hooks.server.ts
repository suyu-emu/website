import { db } from "$lib/server/db";
import "reflect-metadata";
import { building } from "$app/environment";

const runAllTheInitFunctions = async () => {
	await db.initialize();
};

if (!building) {
	await runAllTheInitFunctions();
}
