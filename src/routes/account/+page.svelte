<script lang="ts">
	import { onMount } from "svelte";
	import { SuyuAPI } from "$lib/client/api";
	import type { CreateAccountResponse } from "$types/api";
	import type { PageData } from "./$types";
	import Room from "$components/Room.svelte";

	export let data: PageData;
	let base64Token: string;
	$: base64Token = data?.token ? btoa(data.token) : "";

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

	async function getWsMessage(event: MessageEvent): Promise<string> {
		return new Promise((resolve, reject) => {
			if (event.data instanceof Blob) {
				const reader = new FileReader();

				reader.onload = () => {
					resolve((reader.result as string) || "");
				};

				reader.readAsText(event.data);
			} else {
				resolve(event.data);
			}
		});
	}

	onMount(() => {
		const ws = new WebSocket("wss://sjqr2hlh-21563.uks1.devtunnels.ms/net");
		ws.onmessage = async (event) => {
			const msg = await getWsMessage(event);
			console.log(msg);
		};
		ws.onopen = () => ws.send("hello, world");
	});
</script>

<div class="panel-blur main-panel">
	<h2>Online Services</h2>
	<p>
		{#if data?.token && data?.user && data.user.username}
			<p>Username: {data.user.username}</p>
			<p>Token: <code>{base64Token}</code></p>
			<button class="danger" on:click={deleteAccount}>Delete Account</button>
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
	<h2>Rooms</h2>
	<div class="rooms">
		{#if data.rooms.length > 0}
			{#each data.rooms as room}
				<Room {room} />
			{/each}
		{:else}
			<p>No rooms are currently being hosted.</p>
		{/if}
	</div>
</div>

<style>
	.main-panel {
		position: fixed;
		left: 50%;
		transform: translate(-50%);
		margin-top: 60px;
		width: calc(100% - 120px);
		height: calc(100% - 240px);
		max-height: 1000px;
		min-height: 400px;
		max-width: 1000px;
		padding: 28px 36px;
		padding-top: 12px;
		display: flex;
		flex-direction: column;
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
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: pre;
		width: fit-content;
		max-width: 100%;
		display: block;
		margin-top: 4px;
		margin-bottom: 16px;
	}

	.rooms {
		margin-top: -16px;
		display: flex;
		flex-direction: column;
		gap: 24px;
		height: 0px;
		flex-grow: 1;
		overflow-y: auto;
		--mask-image: linear-gradient(transparent, black 8px, black calc(100% - 32px), transparent),
			linear-gradient(to left, black 8px, transparent 8px);
		padding-top: 8px;
		padding-bottom: 32px;
		mask-image: var(--mask-image);
		-webkit-mask-image: var(--mask-image);
		background-color: transparent;
	}
</style>
