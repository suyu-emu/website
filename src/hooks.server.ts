import { db } from "$lib/server/db";
import "reflect-metadata";
import { building } from "$app/environment";
import type { Handle } from "@sveltejs/kit";
import {WebSocketServer} from "ws";

let server: WebSocketServer;

function initServer() {
	server = new WebSocketServer({
		port: 21563,
		path: "/net"
	});
	server.on("connection", (socket) => {
		socket.on("message", (data) => {
			socket.send(data);
		})
	})
}

const runAllTheInitFunctions = async () => {
	if (!db.isInitialized) await db.initialize();
	if (!server) initServer();
};

if (!building) {
	await runAllTheInitFunctions();
}
