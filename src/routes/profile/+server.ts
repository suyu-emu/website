import { json } from "$lib/server/util/index";
import { useAuth } from "$lib/util/api/index.js";

export async function GET({ request }) {
	const user = await useAuth(request.headers.get("authorization") || "");
	if (!user) return new Response(null, { status: 401 });
	return json({
		username: user.username,
	});
}
