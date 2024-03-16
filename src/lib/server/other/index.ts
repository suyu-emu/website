export interface SwitchGame {
	bannerUrl: string;
	category: string[];
	description: string;
	// developer: null;
	// frontBoxArt: null;
	iconUrl: string;
	id: string;
	intro: null | string;
	isDemo: boolean;
	// key: null;
	languages: string[];
	name: string;
	nsuId: number;
	numberOfPlayers: number;
	publisher: string;
	rating: number;
	ratingContent: string[];
	// region: null;
	releaseDate: number;
	rightsId: string;
	screenshots: string[];
	size: number;
	// version: null;
}
export const globalData: {
	games: SwitchGame[];
} = { games: [] };
