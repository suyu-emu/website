import { db } from "$lib/server/db";
import "reflect-metadata";
import { building } from "$app/environment";
import type { Handle } from "@sveltejs/kit";
import { WebSocketServer } from "ws";

let server: WebSocketServer;

function initServer() {
	try {
		server = new WebSocketServer({
			port: 21563,
			path: "/net",
		});
		server.on("error", (err) => {
			console.error("WebSocket server error:", err);
		});
		server.on("connection", (socket) => {
			socket.on("message", (data) => {
				socket.send(data);
			});
		});
	} catch {}
}

const runAllTheInitFunctions = async () => {
	if (!db.isInitialized) await db.initialize();
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
