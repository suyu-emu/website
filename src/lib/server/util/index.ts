import type { IJwtData } from "$types/auth";
import type { Role } from "$types/db";
import { PUBLIC_KEY } from "../secrets";
import jwt from "jsonwebtoken";

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

export async function getJwtData(token: string): Promise<IJwtData> {
	return new Promise((resolve, reject) => {
		jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] }, (err, data) => {
			if (err) reject(err);
			else resolve(data as IJwtData);
		});
	});
}
