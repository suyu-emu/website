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

export interface GetUserResponseSuccess {
	success: true;
	user: SuyuUser;
}

export interface GetUserResponseFailure {
	success: false;
	error: string;
}

export type GetUserResponse = GetUserResponseSuccess | GetUserResponseFailure;
