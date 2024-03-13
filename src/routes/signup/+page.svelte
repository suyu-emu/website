<!-- <script lang="ts">
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import HCaptcha from "$components/HCaptcha.svelte";
	import { PUBLIC_SITE_KEY } from "$env/static/public";
	import { SuyuAPI } from "$lib/client/api";
	import type { PageData } from "./$types";
	import type { Writable } from "svelte/store";
	import { getContext } from "svelte";

	const token = getContext<Writable<string>>("token");
	if ($token) goto("/account");

	let usernameInput = "";
	let emailInput = "";
	let captchaToken = "";
	$: disabled = !usernameInput || !emailInput || !captchaToken;

	export let data: PageData;

	if (Object.keys(data.user).length !== 0 && browser) goto("/account");

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
		$token = res.token;
		goto("/account");
	}

	async function captchaComplete(event: CustomEvent<any>) {
		captchaToken = event.detail.token;
	}
</script>

<div
	class="align-center relative flex h-[calc(100vh-200px)] flex-col items-center justify-center gap-6 overflow-hidden"
>
	<div class="flex h-fit w-full max-w-[500px] flex-col rounded-[2.25rem] bg-black p-10">
		<h1 class="text-[60px] md:leading-[1.1]">Sign up</h1>
		<div class="mt-4 flex flex-col gap-4">
			<p>
				suyu believes in user privacy; as such, usernames are distributed on a first-come,
				first-serve basis, with no password required. Accounts are used for:
			</p>
			<ul class="[&>*]:before:mr-3 [&>*]:before:content-['•']">
				<li>Creating rooms</li>
				<li>Adding friends</li>
			</ul>
			<p>
				Lost your account? <a class="link" href="https://discord.gg/suyu" target="_blank"
					>Contact us</a
				>.
			</p>
			<input
				bind:value={emailInput}
				maxlength="128"
				class="input"
				type="text"
				placeholder="Recovery Email"
			/>
			<input
				bind:value={usernameInput}
				maxlength="24"
				class="input"
				type="text"
				placeholder="Username"
			/>
			<div class="h-[78px]">
				<HCaptcha on:success={captchaComplete} theme="dark" sitekey={PUBLIC_SITE_KEY} />
			</div>
			<button {disabled} on:click={signUp} class="cta-button mt-2">Sign up</button>
		</div>
	</div>
</div> -->
