/* api types */

import type { SuyuUser } from "$lib/server/schema";

export interface GenericFailureResponse {
	success: false;
	error: string;
}

export interface CreateAccountRequest {
	username: string;
}

export interface CreateAccountResponseSuccess {
	success: true;
	user: SuyuUser;
	token: string;
}
export type CreateAccountResponse = CreateAccountResponseSuccess | GenericFailureResponse;

export interface DeleteAccountResponseSuccess {
	success: true;
}

export type DeleteAccountResponse = DeleteAccountResponseSuccess | GenericFailureResponse;

export interface GetUserResponseSuccess {
	success: true;
	user: SuyuUser;
}

export type GetUserResponse = GetUserResponseSuccess | GenericFailureResponse;
