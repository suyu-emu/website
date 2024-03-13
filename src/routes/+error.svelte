<script lang="ts">
	import { page } from "$app/stores";

	let initialStatusGot = false;
	let status = 0;
	let message = "";
	page.subscribe((val) => {
		if (val.status && !initialStatusGot) {
			initialStatusGot = true;
			status = val.status;
			message = val.error?.message || "Unknown Error";
		}
	});
</script>

<div
	class="flex h-[calc(100vh-300px)] w-full flex-col items-center justify-center gap-4 text-center"
>
	<h1 class="text-[24px] leading-[1.41] md:text-[32px] md:leading-[1.1]">
		Well, that's an error...
	</h1>
	<h1 class="text-[42px] leading-[1.41] md:text-[84px] md:leading-[1.1]">
		{status}: "{message}"
	</h1>
	<p style="text-align: center;" class="max-w-[36rem] text-lg leading-relaxed text-[#A6A5A7]">
		Sorry about that. Click the suyu logo to go home.
	</p>
</div>
