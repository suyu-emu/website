import type { CreateAccountRequest, CreateAccountResponse } from "$types/api";

const apiUsers = {
	async createAccount(body: CreateAccountRequest): Promise<CreateAccountResponse> {
		return await SuyuAPI.req("POST", "/api/user/create-account", body);
	},
} as const;

export class SuyuAPI {
	static users = apiUsers;

	static async req(method: string, path: string, body?: any) {
		const res = await fetch(path, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		return await res.json();
	}
}
