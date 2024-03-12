import { building } from "$app/environment";
import { DISCORD_USER_TOKEN } from "$env/static/private";

let memberCount = 0;
let roleMembers: { [key: string]: number } = {
	"1214817156420862012": 50,
};
async function setMemberCount() {
	console.log("Fetching member count");
	const promises = [
		fetch("https://discord.com/api/v9/invites/suyu?with_counts=true&with_expiration=true"),
		DISCORD_USER_TOKEN
			? fetch("https://discord.com/api/v9/guilds/1214371687114477618/roles/member-counts", {
					headers: {
						Authorization: DISCORD_USER_TOKEN,
					},
				})
			: Promise.resolve({ json: () => roleMembers }),
	];
	const [res, roles] = await Promise.all(promises);
	const jsonPromises = [res.json(), roles.json()];
	const [resJson, rolesJson] = await Promise.all(jsonPromises);
	memberCount = resJson.approximate_member_count;
	if (DISCORD_USER_TOKEN) roleMembers = rolesJson;
	console.log("Member count:", memberCount);
}

if (!building) {
	await setMemberCount();
	setInterval(setMemberCount, 1000 * 60 * 10);
}

export async function load(opts) {
	return {
		memberCount,
		roleMembers,
	};
}
