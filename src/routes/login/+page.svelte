<script lang="ts">
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import HCaptcha from "$components/HCaptcha.svelte";
	import { PUBLIC_SITE_KEY } from "$env/static/public";
	import { SuyuAPI } from "$lib/client/api";
	import type { PageData } from "./$types";
	import type { Writable } from "svelte/store";
	import { getContext, onMount } from "svelte";

	const token = getContext<Writable<string>>("token");
	if ($token) goto("/account");

	let emailInput = "";
	let passwordInput = "";
	$: disabled = !emailInput || !passwordInput;

	export let data: PageData;

	if (Object.keys(data.user).length !== 0 && browser) goto("/account");

	async function logIn() {
		const res = await SuyuAPI.users.login({
			email: emailInput,
			password: passwordInput,
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

	function enter(e: KeyboardEvent) {
		if (e.key === "Enter") logIn();
	}
</script>

<div
	class="align-center relative flex h-[calc(100vh-200px)] flex-col items-center justify-center gap-6"
>
	<div class="flex h-fit w-full max-w-[500px] flex-col rounded-[2.25rem] bg-[#110d10] p-10">
		<h1 class="text-[48px] md:text-[60px] md:leading-[1.1]">Log in</h1>
		<div class="mt-4 flex flex-col gap-4">
			<p>
				Lost your account? <a class="link" href="https://discord.gg/suyu" target="_blank"
					>Contact us</a
				>.
			</p>
			<input
				bind:value={emailInput}
				maxlength="128"
				class="input"
				type="email"
				autocomplete="email"
				placeholder="Email"
			/>
			<input
				autocomplete="current-password"
				bind:value={passwordInput}
				class="input"
				type="password"
				placeholder="Password"
				on:keydown={enter}
			/>
			<button {disabled} on:click={logIn} class="cta-button mt-2">Log in</button>
		</div>
	</div>
</div>
