<script lang="ts">
	import { XCircleOutline } from "flowbite-svelte-icons";
	import { Dialog } from "radix-svelte";
	import type { ResolvedProps } from "radix-svelte/internal/helpers";

	let rootOpen: boolean;
	let rootModal: boolean = true;
	let portalContainer: HTMLElement | string;
	let contentOpenAutoFocus: boolean = true;
	let contentCloseAutoFocus: boolean = true;
</script>

<svelte:head>
	<title>suyu - Open-source, non-profit Switch emulator</title>
</svelte:head>

<div
	class="relative flex w-full flex-col gap-6 overflow-hidden rounded-[2.25rem] rounded-bl-none rounded-br-none bg-black p-8 md:p-12 lg:rounded-bl-none lg:rounded-br-[2.25rem]"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="512"
		height="525"
		viewBox="0 0 512 525"
		fill="none"
		style="animation-duration: 300s; transform-origin: 50% 50%; animation-iteration-count: infinite; animation-timing-function: linear; animation-name: spin; animation-delay: 0s; animation-direction: normal; animation-fill-mode: none; animation-play-state: running;"
		class="absolute -bottom-[18rem] right-0 z-0 animate-spin opacity-20"
	>
		<path
			d="M511.5 262.12C511.5 353.613 465.547 434.182 396.019 480.947C408.179 457.937 415.083 431.597 415.083 403.617C415.083 313.723 343.816 240.744 255.992 240.744C191.257 240.744 138.692 186.941 138.692 120.622C138.692 54.3027 191.257 0.5 255.992 0.5C397.026 0.5 511.5 117.695 511.5 262.12ZM255.992 53.5225C243.745 53.5225 233.816 63.7047 233.816 76.2224C233.816 88.7388 243.745 98.9223 255.992 98.9223C268.257 98.9223 278.173 88.7387 278.173 76.2224C278.173 63.7048 268.257 53.5225 255.992 53.5225ZM299.355 97.9223C287.104 97.9223 277.173 108.104 277.173 120.622C277.173 133.139 287.104 143.322 299.355 143.322C311.62 143.322 321.536 133.139 321.536 120.622C321.536 108.104 311.62 97.9223 299.355 97.9223ZM212.635 97.9223C200.382 97.9223 190.455 108.104 190.455 120.622C190.455 133.139 200.382 143.322 212.635 143.322C224.889 143.322 234.816 133.139 234.816 120.622C234.816 108.104 224.888 97.9223 212.635 97.9223ZM255.992 142.322C243.745 142.322 233.816 152.505 233.816 165.021C233.816 177.539 243.745 187.721 255.992 187.721C268.257 187.721 278.173 177.538 278.173 165.021C278.173 152.505 268.257 142.322 255.992 142.322Z"
			stroke="white"
		/>
		<path
			d="M0.5 262.119C0.5 170.626 46.444 90.0553 115.976 43.2909C103.82 66.3019 96.9172 92.6424 96.9172 120.622C96.9172 210.516 168.174 283.495 255.992 283.495C320.735 283.495 373.305 337.298 373.305 403.617C373.305 469.934 320.735 523.739 255.992 523.739C114.974 523.739 0.5 406.544 0.5 262.119ZM255.992 336.517C243.744 336.517 233.816 346.7 233.816 359.217C233.816 371.735 243.745 381.917 255.992 381.917C268.256 381.917 278.173 371.735 278.173 359.217C278.173 346.701 268.256 336.517 255.992 336.517ZM299.355 380.917C287.104 380.917 277.173 391.099 277.173 403.617C277.173 416.135 287.104 426.317 299.355 426.317C311.619 426.317 321.536 416.135 321.536 403.617C321.536 391.099 311.619 380.917 299.355 380.917ZM255.992 425.317C243.745 425.317 233.816 435.499 233.816 448.016C233.816 460.533 243.744 470.717 255.992 470.717C268.256 470.717 278.173 460.533 278.173 448.016C278.173 435.499 268.256 425.317 255.992 425.317ZM212.634 380.917C200.382 380.917 190.454 391.099 190.454 403.617C190.454 416.135 200.382 426.317 212.634 426.317C224.888 426.317 234.816 416.135 234.816 403.617C234.816 391.099 224.888 380.917 212.634 380.917Z"
			stroke="white"
		/>
	</svg>
	<h1 class="text-[24px] leading-[1.41] md:text-[60px] md:leading-[1.1]">
		suyu is the open-source, non-profit Switch emulator
	</h1>
	<p class="max-w-[36rem] text-lg leading-relaxed text-[#A6A5A7]">
		suyu is a familiar C++ based Switch emulator with a focus on compatibility. Completely free and
		open-source, forever.
	</p>
	<div class="flex flex-row gap-4">
		<Dialog.Root bind:modal={rootModal} bind:open={rootOpen}>
			<Dialog.Trigger class="cta-button">
				Download <svg
					class=""
					style="--icon-color:#000"
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="#000"
					role="img"
					focusable="false"
					aria-hidden="true"
					><path
						d="M5.46967 11.4697C5.17678 11.7626 5.17678 12.2374 5.46967 12.5303C5.76256 12.8232 6.23744 12.8232 6.53033 12.5303L10.5303 8.53033C10.8207 8.23999 10.8236 7.77014 10.5368 7.47624L6.63419 3.47624C6.34492 3.17976 5.87009 3.17391 5.57361 3.46318C5.27713 3.75244 5.27128 4.22728 5.56054 4.52376L8.94583 7.99351L5.46967 11.4697Z"
					></path></svg
				>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay
					class="fixed inset-0 z-[9999] bg-black/80 data-[state=open]:animate-[overlayShow_555ms_cubic-bezier(.16,1,.3,1)]"
				/>
				<Dialog.Content
					class="fixed left-[50%] top-[50%] z-[9999] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%]
					translate-y-[-50%] rounded-md bg-white p-[25px] shadow-lg
					focus:outline-none data-[state=open]:animate-[contentShow_555ms_cubic-bezier(.16,1,.3,1)]"
					openAutoFocus={contentOpenAutoFocus}
					closeAutoFocus={contentCloseAutoFocus}
				>
					<Dialog.Title class="m-0 text-2xl font-medium text-black">
						suyu isn't available for download yet.</Dialog.Title
					>
					<Dialog.Description class="mb-5 mt-[10px] leading-normal text-zinc-600">
						Official downloads for suyu aren't available yet, but you're welcome to
						compile it yourself from the source code. If you're not comfortable with
						that, we recommend you wait for the official release.
					</Dialog.Description>

					<Dialog.Close
						class="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center
					justify-center rounded-full text-black focus:outline-none focus:ring-2 focus:ring-black"
						aria-label="Close"
					>
						<XCircleOutline />
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
		<a
			href="https://gitlab.com/suyu-emu/"
			target="_blank"
			rel="noreferrer noopener"
			class="button text-[#8A8F98]"
		>
			Contribute <svg
				class=""
				style="--icon-color:#8A8F98"
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="#8A8F98"
				role="img"
				focusable="false"
				aria-hidden="true"
				><path
					d="M5.46967 11.4697C5.17678 11.7626 5.17678 12.2374 5.46967 12.5303C5.76256 12.8232 6.23744 12.8232 6.53033 12.5303L10.5303 8.53033C10.8207 8.23999 10.8236 7.77014 10.5368 7.47624L6.63419 3.47624C6.34492 3.17976 5.87009 3.17391 5.57361 3.46318C5.27713 3.75244 5.27128 4.22728 5.56054 4.52376L8.94583 7.99351L5.46967 11.4697Z"
				></path></svg
			>
		</a>
	</div>
</div>

<div class="flex w-full flex-col lg:flex-row">
	<div
		class="flex w-full flex-shrink-0 flex-col gap-8 rounded-b-[2.25rem] bg-black p-12 lg:w-[35%]"
	>
		<h1 class="text-[48px] leading-[0.9]">By the numbers</h1>
		<div class="flex flex-col gap-0">
			<h2 class="text-[40px] leading-[1.1]">30+</h2>
			<div class="text-[#A6A5A7]">dedicated contributors</div>
		</div>
		<div class="flex flex-col gap-0">
			<h2 class="text-[40px] leading-[1.1]">4000+</h2>
			<div class="text-[#A6A5A7]">supported games</div>
		</div>
		<div class="flex flex-col gap-0">
			<h2 class="text-[40px] leading-[1.1]">14000+</h2>
			<div class="text-[#A6A5A7]">members on Discord</div>
		</div>
	</div>
	<div class="flex w-full flex-1 rounded-[2.25rem] bg-black lg:rounded-tl-none">
		<div
			class="flex w-full flex-1 rounded-[2.25rem] rounded-bl-none rounded-tr-none bg-[#131215] pt-8 lg:pl-8"
		>
			<div
				class="h-full w-full overflow-hidden rounded-[2.25rem] bg-black shadow-lg ring ring-[#ffffff11]"
			>
				<img
					class="h-full max-h-[496px] w-full object-cover"
					alt=""
					decoding="async"
					loading="lazy"
					src="/img/bettercrophero.png"
				/>
			</div>
		</div>
	</div>
</div>

<div
	class="relative mt-48 flex w-full flex-col gap-6 overflow-hidden rounded-[2.25rem] bg-[#eee] p-8 text-black md:p-12"
>
	<h1 class="text-[24px] leading-[1.41] md:text-[60px] md:leading-[1.1]">
		Built by and for the community
	</h1>
	<p class="max-w-[40rem] text-lg leading-relaxed text-[#4D4D4D]">
		The future of suyu is shaped by you. New features are always being added, and our community
		continually shapes the direction of the project.
	</p>
</div>

<div class="mt-8 flex w-full flex-col gap-8 lg:flex-row">
	<a
		href="https://discord.gg/suyu/"
		target="_blank"
		rel="noreferrer noopener"
		class="relative w-full rounded-[2.25rem] bg-[#5451ff] p-12"
	>
		<h2 class="text-[24px] leading-[1.41] md:text-[60px] md:leading-[1.1]">Discord</h2>
		<p class="mt-2 text-lg leading-relaxed">
			Join our Discord server to chat with 14,000+ suyu users and developers. Get the latest
			updates and help with any issues you have.
		</p>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			class="absolute right-12 top-12 h-12 w-12"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="4"
				d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
			/>
		</svg>
	</a>
	<a
		href="https://gitlab.com/suyu-emu/"
		target="_blank"
		rel="noreferrer noopener"
		class="relative w-full rounded-[2.25rem] bg-[#f78c40] p-12"
	>
		<h2 class="text-[24px] leading-[1.41] md:text-[60px] md:leading-[1.1]">GitLab</h2>
		<p class="mt-2 text-lg leading-relaxed">
			GitLab is where all the magic of suyu happens. We're always looking for new contributors
			to help us out, so feel free to check out our code.
		</p>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			class="absolute right-12 top-12 h-12 w-12"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="4"
				d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
			/>
		</svg>
	</a>
</div>

<div data-spacer-element class="min-h-[400px]"></div>
