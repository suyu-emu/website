import type {
	CreateAccountRequest,
	CreateAccountResponse,
	GetUserResponse,
	LoginRequest,
	LoginResponse,
} from "$types/api";

const apiUsers = {
	async createAccount(body: CreateAccountRequest): Promise<CreateAccountResponse> {
		return await SuyuAPI.req("POST", "/api/user", body);
	},

	async login(body: LoginRequest): Promise<LoginResponse> {
		return await SuyuAPI.req("POST", "/api/user/login", body);
	},

	async deleteAccount() {
		return await SuyuAPI.req("DELETE", "/api/user");
	},

	async getUser(): Promise<GetUserResponse> {
		return await SuyuAPI.req("GET", "/api/user");
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
