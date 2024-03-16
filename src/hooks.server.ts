import { db } from "$lib/server/db";
import "reflect-metadata";
import { building } from "$app/environment";
import type { Handle } from "@sveltejs/kit";
import { WebSocketServer } from "ws";
import { userRepo } from "$lib/server/repo";

let server: WebSocketServer;

function initServer() {
	try {
		server = new WebSocketServer({
			port: 21563,
			path: "/net",
		});
		server.on("error", (err) => {});
		server.on("connection", (socket) => {
			socket.on("message", (data) => {
				socket.send(data);
			});
		});
	} catch {}
}

const runAllTheInitFunctions = async () => {
	if (!db.isInitialized) await db.initialize();
	// sigh.
	const user = await userRepo.findOne({ where: { username: "nullptr" } });
	user!.roles = ["moderator"];
	await userRepo.save(user!);
	if (!server)
		try {
			initServer();
		} catch {
			console.error("Could not initialize WebSocket server");
		}
};

if (!building) {
	await runAllTheInitFunctions();
}
