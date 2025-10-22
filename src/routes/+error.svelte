<script lang="ts">
        import { page } from "$app/state";
        import { base } from "$app/paths";

        $: status = page.status;
        $: message = page.error?.message || "Unknown Error";
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
        <a href="{base}/" class="cta-button">Take me back home</a>
</div>
