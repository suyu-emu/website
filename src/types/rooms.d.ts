import type { SuyuUser } from "$lib/server/schema";

export interface IRoom {
	address: string;
	description: string;
	externalGuid: string;
	hasPassword: boolean;
	id: string;
	maxPlayers: number;
	name: string;
	netVersion: number;
	owner: string;
	players: SuyuUser[];
	port: number;
	preferredGameId: number;
	preferredGameName: string;
}

export interface LobbyResponse {
	rooms: IRoom[];
}
