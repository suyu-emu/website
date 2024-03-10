import type { Role } from "$types/db";

export function json<T>(body: T): Response {
	return new Response(JSON.stringify(body), {
		headers: {
			"content-type": "application/json;charset=UTF-8",
		},
	});
}

export function serializeRoles(roles: Role[]): string {
	return roles.join("|");
}

export function deserializeRoles(roles: string): Role[] {
	return roles.split("|") as Role[];
}
