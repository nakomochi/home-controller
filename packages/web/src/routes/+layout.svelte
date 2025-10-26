<script lang="ts">
import "../app.css";
import favicon from "$lib/assets/favicon.svg";

const { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex flex-col min-h-screen">
	{@render children?.()}
</div>
