// TODO: refactor into external utils (ie Suyu.createAccount() or something???)

import { userRepo } from "$lib/server/repo";
import type { SuyuUser } from "$lib/server/schema";
import { json, serializeRoles } from "$lib/server/util";
import { useAuth } from "$lib/util/api";
import type {
	CreateAccountRequest,
	CreateAccountResponse,
	DeleteAccountResponse,
	GetUserResponse,
} from "$types/api";
import crypto from "crypto";
import { promisify } from "util";
import { verify } from "hcaptcha";
import { PUBLIC_SITE_KEY } from "$env/static/public";
import { HCAPTCHA_KEY } from "$env/static/private";
import validator from "validator";

const randomBytes = promisify(crypto.randomBytes);

async function genKey(username: string) {
	const random = (await randomBytes(80)).toString("hex");
	let apiKey = `${username}:${random}`;
	let b64ApiKey = Buffer.from(apiKey).toString("base64");
	if (b64ApiKey.length > 80) {
		b64ApiKey = b64ApiKey.slice(0, 80);
	}
	// decode b64ApiKey
	apiKey = Buffer.from(b64ApiKey, "base64").toString("utf-8");
	return apiKey;
}

export async function POST({ request, getClientAddress }) {
	const body: CreateAccountRequest = await request.json();
	if (!body.username || !body.email || !body.captchaToken) {
		return json<CreateAccountResponse>({
			success: false,
			error: "missing fields",
		});
	}
	if (!validator.isEmail(body.email)) {
		return json<CreateAccountResponse>({
			success: false,
			error: "invalid email",
		});
	}
	const res = await verify(HCAPTCHA_KEY, body.captchaToken, getClientAddress(), PUBLIC_SITE_KEY);
	if (!res.success) {
		return json<CreateAccountResponse>({
			success: false,
			error: "missing fields!",
		});
	}
	// check if user exists
	const user = await userRepo.findOne({
		where: [
			{
				username: body.username,
			},
			{
				email: body.email,
			},
		],
	});
	if (user) {
		return json<CreateAccountResponse>({
			success: false,
			error: "user already exists",
		});
	}
	// the api key can only be 80 characters total, including the username and colon
	const key = await genKey(body.username);
	const createdUser: SuyuUser = userRepo.create({
		username: body.username,
		avatarUrl: `https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 100000000)}?v=4`,
		displayName: body.username,
		roles: serializeRoles(["user"]),
		apiKey: key,
		email: body.email,
	});
	await userRepo.save(createdUser);
	return json<CreateAccountResponse>({
		success: true,
		token: createdUser.apiKey,
		user: createdUser,
	});
}

export async function GET({ request }) {
	const user = await useAuth(request);
	if (!user) {
		return json<GetUserResponse>({
			success: false,
			error: "unauthorized",
		});
	}
	return json<GetUserResponse>({
		success: true,
		user,
	});
}

export async function DELETE({ request }) {
	const user = await useAuth(request);
	if (!user) {
		return json<DeleteAccountResponse>({
			success: false,
			error: "unauthorized",
		});
	}
	await userRepo.remove(user);
	return json<DeleteAccountResponse>({
		success: true,
	});
}
