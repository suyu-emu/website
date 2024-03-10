import { useAuth } from "$lib/util/api";

export async function load(opts) {
	const apiKey = opts.cookies.get("api_key");
	const user = await useAuth(apiKey || "unused");
	return {
		user: { ...user },
		a: "B",
	};
}
