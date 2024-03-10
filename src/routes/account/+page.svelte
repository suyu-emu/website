<script lang="ts">
	import { onMount } from "svelte";
	import { SuyuAPI } from "$lib/client/api";
	import type { CreateAccountResponse } from "$types/api";
	import type { PageData } from "./$types";

	export let data: PageData;

	let usernameToCreate: string;

	async function createAccount() {
		const response = await SuyuAPI.users.createAccount({ username: usernameToCreate });
		if (response.success) {
			data = {
				...(data || {}),
				user: response.user,
			};
			// add api_key cookie
			document.cookie = `api_key=${response.token}; path=/`;
		} else {
			alert("Failed to create account: " + response.error);
			window.location.reload();
		}
	}
</script>

<div class="panel-blur main-panel">
	<h2>Account Settings</h2>
	<p>
		{#if data?.user}
			<p>Username: {data.user.username}</p>
		{:else}
			<p>
				It appears you don't have an account; please register one to access suyu's online
				services.
			</p>
			<div class="create-account">
				<input bind:value={usernameToCreate} type="text" placeholder="Username" />
				<button on:click={createAccount}>Create Account</button>
			</div>
		{/if}
	</p>
</div>

<style>
	.main-panel {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, calc(-50% + 40px));
		width: calc(100% - 120px);
		height: calc(100% - 240px);
		max-height: 600px;
		min-height: 400px;
		max-width: 1000px;
		padding: 28px 36px;
		padding-top: 12px;
	}

	.main-panel > h2 {
		margin-bottom: 16px;
		margin-top: 16px;
	}

	.create-account {
		margin-top: 16px;
	}
</style>
