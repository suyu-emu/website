import type { IRoom, IRoomConfig, RoomPlayer } from "$types/rooms";
import { globalData, type SwitchGame } from "../other";
import type { SuyuUser } from "../schema";
import { v4 } from "uuid";

export class RoomManager {
	private static rooms: Room[] = [];
	static createRoom(room: IRoomConfig) {
		const newRoom = new Room(room);
		this.rooms.push(newRoom);
		return newRoom;
	}

	static getRooms() {
		return this.rooms;
	}

	static getRoom(id: string) {
		return this.rooms.find((room) => room.roomInfo.id === id);
	}

	static removeRoom(id: string) {
		const index = this.rooms.findIndex((room) => room.roomInfo.id === id);
		this.rooms.splice(index, 1);
	}
}

export class Room {
	public roomInfo: IRoom;
	public host: SuyuUser;
	constructor(
		// name: string,
		// description: string,
		// game: string,
		// players: SuyuUser[],
		// maxPlayers: number,
		// ip: string,
		config: IRoomConfig,
	) {
		const parsed = config.ip.split(":");
		this.host = config.host;
		this.roomInfo = {
			name: config.name,
			description: config.description,
			preferredGameName: config.gameName,
			preferredGameId: config.gameId,
			players: config.players,
			maxPlayers: config.maxPlayers,
			address: parsed[0],
			externalGuid: v4(),
			hasPassword: config.hasPassword,
			id: v4(),
			netVersion: 1,
			owner: this.host.username,
			port: parseInt(parsed[1]),
			game: globalData.games.find(
				(g) => g.name.toUpperCase().trim() === config.gameName.toUpperCase().trim(),
			),
		};
	}

	addPlayer(user: RoomPlayer) {
		this.roomInfo.players.push(user);
	}

	setPlayerList(players: RoomPlayer[]) {
		this.roomInfo.players = players;
	}

	toJSON() {
		return this.roomInfo;
	}

	delete() {
		RoomManager.removeRoom(this.roomInfo.id);
	}
}
