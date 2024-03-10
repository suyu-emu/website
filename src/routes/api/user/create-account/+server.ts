// TODO: refactor into external utils (ie Suyu.createAccount() or something???)

import { userRepo } from "$lib/server/repo";
import type { SuyuUser } from "$lib/server/schema";
import { json, serializeRoles } from "$lib/server/util";
import type { CreateAccountRequest, CreateAccountResponse } from "$types/api";
import crypto from "crypto";
import { promisify } from "util";

const randomBytes = promisify(crypto.randomBytes);

export async function POST({ request }) {
	const body: CreateAccountRequest = await request.json();
	if (!body.username) {
		return json<CreateAccountResponse>({
			success: false,
			error: "username is required",
		});
	}
	// check if user exists
	const user = await userRepo.findOne({
		where: {
			username: body.username,
		},
	});
	if (user) {
		return json<CreateAccountResponse>({
			success: false,
			error: "username already exists",
		});
	}
	const createdUser: SuyuUser = userRepo.create({
		username: body.username,
		avatarUrl: `https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 100000000)}?v=4`,
		displayName: body.username,
		roles: serializeRoles(["user"]),
		apiKey: `${body.username}:${(await randomBytes(32)).toString("hex")}`,
	});
	await userRepo.save(createdUser);
	return json<CreateAccountResponse>({
		success: true,
		token: createdUser.apiKey,
		user: createdUser,
	});
}
