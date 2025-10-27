<script lang="ts">
	import RemoteControl from "$lib/components/RemoteControl.svelte";
	import LoginPage from "$lib/components/LoginPage.svelte";
	import { onMount } from "svelte";
	import { client } from "$lib/client";
	import { Toaster } from "svelte-sonner";

	let isAuthenticated = false;
	let loading = true;

	onMount(async () => {
		const res = await client.api.auth.$get();
		if (res.ok) {
			isAuthenticated = true;
		}
		loading = false;
	});
</script>

<Toaster/>
<div class="grow flex flex-col container mx-auto p-4">
	<h1 class="text-2xl font-bold mb-4 text-center">Home Controller</h1>
	{#if loading}
	<div class="grow flex items-center justify-center">
		<p>Loading...</p>
	</div>
	{:else if isAuthenticated}
	<RemoteControl/>
	{:else}
	<LoginPage/>
	{/if}
</div>
