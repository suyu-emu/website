import { db } from "$lib/server/db";
import "reflect-metadata";
import { building } from "$app/environment";
import type { Handle } from "@sveltejs/kit";

const runAllTheInitFunctions = async () => {
	if (!db.isInitialized) await db.initialize();
};

if (!building) {
	await runAllTheInitFunctions();
}
