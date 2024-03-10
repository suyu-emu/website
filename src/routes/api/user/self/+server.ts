import { json } from "$lib/server/util";
import { useAuth } from "$lib/util/api";
import type { GetUserResponse } from "$types/api";

export async function GET({ request }) {
	const user = await useAuth(request);
	if (!user) {
		return json<GetUserResponse>({
			success: false,
			error: "unauthorized",
		});
	}
	return json<GetUserResponse>({
		success: true,
		user,
	});
}
