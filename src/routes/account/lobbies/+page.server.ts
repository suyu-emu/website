import { building } from "$app/environment";
import { RoomManager } from "$lib/server/class/Room.js";
import { globalData } from "$lib/server/other/index.js";

export function load({ request }) {
	const rooms = RoomManager.getRooms().map((r) => r.toJSON()) || [];
	const requiredGames = rooms
		.map((r) => r.preferredGameName.toUpperCase().trim())
		.map((r) => globalData.games.find((g) => g.name.toUpperCase().trim() === r));
	return {
		rooms: rooms,
		games: requiredGames,
	};
}
