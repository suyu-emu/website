import { json } from "$lib/server/util/index";

export function GET({ request }) {
	console.log(request.headers);
	return json({
		username: "aaa",
	});
}
