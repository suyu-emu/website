import { Room } from "$lib/server/class/Room";
import { json } from "$lib/server/util";
import type { LobbyResponse } from "$types/rooms";

export async function GET({ request }) {
	return json<LobbyResponse>({
		rooms: [new Room("suyu Testing Room 1", "A testing room for suyu", "suyu", [], 4).toJSON()],
	});
}
