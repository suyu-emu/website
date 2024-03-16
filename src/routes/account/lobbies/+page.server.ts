import { RoomManager } from "$lib/server/class/Room.js";

export function load({ request }) {
	return {
		rooms: RoomManager.getRooms().map((r) => r.toJSON()),
	};
}
