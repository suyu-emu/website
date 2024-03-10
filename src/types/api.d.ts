/* api types */

import type { SuyuUser } from "$lib/server/schema";

export interface CreateAccountRequest {
	username: string;
}

export interface CreateAccountResponseSuccess {
	success: true;
	user: SuyuUser;
	token: string;
}

export interface CreateAccountResponseFailure {
	success: false;
	error: string;
}

export type CreateAccountResponse = CreateAccountResponseSuccess | CreateAccountResponseFailure;
