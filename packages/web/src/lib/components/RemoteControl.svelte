<script lang="ts">
	import LightingRemote from "./LightingRemote.svelte";
	import AirconRemote from "./AirconRemote.svelte";
	import { onMount } from "svelte";
	import { client } from "$lib/client";
	import type { Details } from "service";

	type RemoteType = "lighting" | "aircon";

	let selectedRemote = $state<RemoteType>("lighting");
	let details = $state<Details | null>(null);
	let loading = $state(true);

	onMount(async () => {
		const res = await client.api.details.$get();
		if (res.ok) {
			details = await res.json();
		}
		loading = false;
	});
</script>

{#if loading}
<div class="grow flex items-center justify-center">
	<p>Loading device details...</p>
</div>
{:else if details}
<div class="grow flex flex-col">
	<div class="p-4 bg-base-200 rounded-box mb-4">
		<h2 class="text-lg font-bold">Device Details</h2>
		<p>Temperature: {details.temperature}°C</p>
		<p>Humidity: {details.humidity}%</p>
		<p>Illuminance: {details.luminosity}lx</p>
	</div>

	<div class="grow flex items-center justify-center">
		{#if selectedRemote === 'lighting'}
		<LightingRemote bind:luminosity={details.luminosity}/>
		{:else if selectedRemote === 'aircon'}
		<AirconRemote
			bind:temperature={details.temperature}
			bind:humidity={details.humidity}
		/>
		{/if}
	</div>

	<div class="flex justify-center p-4">
		<div class="tabs tabs-boxed">
			<button
				class="tab"
				class:tab-active={selectedRemote === 'lighting'}
				onclick={() => (selectedRemote = 'lighting')}
			>
				照明
			</button>
			<button
				class="tab"
				class:tab-active={selectedRemote === 'aircon'}
				onclick={() => (selectedRemote = 'aircon')}
			>
				エアコン
			</button>
		</div>
	</div>
</div>
{:else}
<div class="grow flex items-center justify-center">
	<p>Failed to load device details.</p>
</div>
{/if}
