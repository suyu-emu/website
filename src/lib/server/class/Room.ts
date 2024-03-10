import type { IRoom } from "$types/rooms";
import type { SuyuUser } from "../schema";

export class Room {
	public roomInfo: IRoom;
	constructor(
		name: string,
		description: string,
		game: string,
		players: SuyuUser[],
		maxPlayers: number,
	) {
		this.roomInfo = {
			name,
			description,
			preferredGameName: game,
			players,
			maxPlayers,
			address: "localhost",
			externalGuid: "1234",
			hasPassword: false,
			id: "1234",
			netVersion: 1,
			owner: "1234",
			port: 1234,
			preferredGameId: 1234,
		};
	}

	async addPlayer(user: SuyuUser) {
		this.roomInfo.players.push(user);
	}

	toJSON() {
		return this.roomInfo;
	}
}
