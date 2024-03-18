import { userRepo } from "$lib/server/repo";
import { RateLimiter, json } from "$lib/server/util/index.js";
import type { LoginResponse, LoginRequest } from "$types/api";
import bcrypt from "bcrypt";

const rateLimit = new RateLimiter();

export async function POST({ request, getClientAddress }) {
	if (rateLimit.isLimited(getClientAddress()))
		return json<LoginResponse>({
			success: false,
			error: "rate limited",
		});
	const body: LoginRequest = await request.json();
	if (
		!body.email ||
		!body.password ||
		body.email.trim() === "" ||
		body.password.trim() === "" ||
		body.email.length > 320 ||
		body.password.length > 320
	)
		return json<LoginResponse>({
			success: false,
			error: "missing fields",
		});
	const user = await userRepo.findOne({
		where: {
			email: body.email,
		},
		select: ["password", "apiKey"],
	});
	if (!user)
		return json<LoginResponse>({
			success: false,
			error: "user not found",
		});
	if (!(await bcrypt.compare(body.password, user.password))) {
		return json<LoginResponse>({
			success: false,
			error: "invalid password",
		});
	}
	return json<LoginResponse>({
		success: true,
		token: user.apiKey,
	});
}
