import { userRepo } from "$lib/server/repo";
import type { SuyuUser } from "$lib/server/schema";
import cookie from "cookie";

export async function useAuth(request: Request | string): Promise<SuyuUser | null> {
	const apiKey =
		typeof request === "string"
			? request
			: cookie.parse(request.headers.get("cookie") || "").token;
	if (!apiKey) {
		return null;
	}
	const user = await userRepo.findOne({
		where: {
			apiKey,
		},
	});
	return user;
}
