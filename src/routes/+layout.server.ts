export function load({ cookies, url }) {
	const token = cookies.get("token");
	return {
		tokenCookie: token,
		url: url.pathname,
	};
}
