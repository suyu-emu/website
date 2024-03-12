<script lang="ts">
	import { ModalManager, type Modal } from "$lib/util/modal";
	import { browser } from "$app/environment";
	import { onMount } from "svelte";

	const closeDuration = 180;

	let modal: Modal | null = null;
	let closing = false;

	$: pointer = modal ? "pointer-events-auto" : "pointer-events-none";
	$: opacity = closing || !modal ? "opacity-0" : "opacity-100";
	$: scale = !closing && modal ? "scale-100" : "scale-[0.9]";

	function closeModal() {
		if (closing) return;
		closing = true;
		setTimeout(() => {
			closing = false;
			modal = null;
		}, closeDuration);
	}

	function modalBgClick(e: MouseEvent) {
		if (e.target === e.currentTarget) closeModal();
	}

	function modalEsc(e: KeyboardEvent) {
		console.log(e.key);
		if (e.key === "Escape") closeModal();
	}

	onMount(() => {
		const id = ModalManager.addListener((d) => {
			modal = d;
		});
		return () => {
			ModalManager.removeListener(id);
		};
	});
</script>

<div
	style="transition: 180ms ease; transition-property: opacity;"
	class={`fixed inset-0 z-50 h-screen w-screen ${opacity} ${pointer} flex items-center justify-center bg-[rgba(0,0,0,0.5)]`}
	tabindex="-1"
	id="modal-root"
	role="presentation"
	on:click={modalBgClick}
	on:keydown={modalEsc}
>
	<div
		style="transition: 180ms ease; transition-property: transform;"
		class={`${scale} relative w-full max-w-[750px] rounded-[2.25rem] border border-solid border-gray-700 bg-black p-10 shadow-2xl shadow-stone-900`}
	>
		{#if modal}
			<h1 class="text-5xl">{modal.title}</h1>
			<p class="mt-4 text-lg leading-relaxed text-[#A6A5A7]">{modal.message}</p>
		{/if}
	</div>
</div>
