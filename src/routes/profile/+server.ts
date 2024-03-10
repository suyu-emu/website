import { json } from "$lib/server/util/index";

export function GET({ request }) {
	return json({
		username: "nullptr",
	});
}
