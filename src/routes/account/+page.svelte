<script lang="ts">
	import { goto } from "$app/navigation";
	import HCaptcha from "$components/HCaptcha.svelte";
	import { PUBLIC_SITE_KEY } from "$env/static/public";
	import { SuyuAPI } from "$lib/client/api";
	import type { PageData } from "./$types";

	let usernameInput = "";
	let emailInput = "";
	let captchaToken = "";
	$: disabled = !usernameInput || !emailInput || !captchaToken;

	export let data: PageData;
	$: {
		if (Object.keys(data.user).length === 0) goto("/signup");
	}
	async function signUp() {
		const res = await SuyuAPI.users.createAccount({
			username: usernameInput,
			email: emailInput,
			captchaToken,
		});
		if (!res.success) {
			// TODO: modal
			alert(res.error);
			return;
		}
		// set "token" cookie
		document.cookie = `token=${res.token}; path=/; max-age=31536000; samesite=strict`;
		goto("/account");
	}

	async function captchaComplete(event: CustomEvent<any>) {
		captchaToken = event.detail.token;
	}
</script>

<div
	class="align-center relative flex h-[calc(100vh-200px)] flex-col items-center justify-center gap-6 overflow-hidden"
>
	a
</div>
