<script lang="ts">
	import { onMount } from "svelte";
	import { SuyuAPI } from "$lib/client/api";
	import type { CreateAccountResponse } from "$types/api";
	import type { PageData } from "./$types";

	export let data: PageData;

	let usernameToCreate: string;
	let createBtn: HTMLButtonElement;

	async function createAccount() {
		createBtn.disabled = true;
		const response = await SuyuAPI.users.createAccount({ username: usernameToCreate });
		if (response.success) {
			data = {
				...(data || {}),
				user: response.user,
				token: response.token,
			};
			// add token cookie
			document.cookie = `token=${response.token}; path=/`;
		} else {
			alert("Failed to create account: " + response.error);
			window.location.reload();
		}
		usernameToCreate = "";
		createBtn.disabled = false;
	}

	async function deleteAccount() {
		const response = await SuyuAPI.users.deleteAccount();
		if (response.success) {
			data = {
				...(data || {}),
				// @ts-expect-error since we're deleting the account, we can't expect the user to still exist
				user: undefined,
				token: undefined,
			};
			// remove token cookie
			document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		} else {
			alert("Failed to delete account: " + response.error);
		}
	}
</script>

<div class="panel-blur main-panel">
	<h2>Account Settings</h2>
	<p>
		{#if data?.token && data?.user && data.user.username}
			<p>Username: {data.user.username}</p>
			<p>Token: <code>{data.token}</code></p>
		{:else}
			<p>
				It appears you don't have an account; please register one to access suyu's online
				services.
			</p>
			<div class="create-account">
				<input bind:value={usernameToCreate} type="text" placeholder="Username" />
				<button bind:this={createBtn} on:click={createAccount}>Create Account</button>
			</div>
		{/if}
	</p>
	<div class="float-bottom-right">
		<button class="danger" on:click={deleteAccount}>Delete Account</button>
	</div>
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

	.main-panel code {
		background-color: #222429;
		border: var(--border-primary);
		padding: 2px 8px;
		border-radius: 4px;
		user-select: all;
	}

	.float-bottom-right {
		position: absolute;
		bottom: 0;
		right: 0;
		margin: 16px;
	}
</style>
