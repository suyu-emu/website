import { userRepo } from "$lib/server/repo";
import type { SuyuUser } from "$lib/server/schema";

export async function useAuth(request: Request | string): Promise<SuyuUser | null> {
	const apiKey = typeof request === "string" ? request : request.headers.get("Authorization");
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
