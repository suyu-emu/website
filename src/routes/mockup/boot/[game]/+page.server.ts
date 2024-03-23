import type { PageServerLoad } from "./$types";
import { getQueriedGamesAmerica, type GameUS } from "nintendo-switch-eshop";

export const load: PageServerLoad = async ({ params }) => {
	const games = await getQueriedGamesAmerica(params.game);
	return {
		props: {
			games,
		},
	};
};
