<script lang="ts">
import LightingRemote from "./LightingRemote.svelte";
import AirconRemote from "./AirconRemote.svelte";

type RemoteType = "lighting" | "aircon";

let selectedRemote: RemoteType = $state("lighting");
</script>

<div class="grow flex items-center justify-center">
  {#if selectedRemote === 'lighting'}
    <LightingRemote />
  {:else if selectedRemote === 'aircon'}
    <AirconRemote />
  {/if}
</div>

<div class="flex justify-center p-4">
    <div class="tabs tabs-boxed">
        <button class="tab" class:tab-active={selectedRemote === 'lighting'} onclick={() => (selectedRemote = 'lighting')}>照明</button>
        <button class="tab" class:tab-active={selectedRemote === 'aircon'} onclick={() => (selectedRemote = 'aircon')}>エアコン</button>
    </div>
</div>
