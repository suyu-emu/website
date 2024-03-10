import { json } from "$lib/server/util/index.js";

export function GET({ request }) {
	console.log(request);
	return new Response(
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB.CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
		{
			headers: {
				"content-type": "text/html",
			},
		},
	);
}

export function POST() {
	return new Response("god fucking kill me");
}
