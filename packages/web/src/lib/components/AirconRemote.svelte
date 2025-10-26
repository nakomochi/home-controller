<script lang="ts">
import { ChevronUp, ChevronDown } from "lucide-svelte";
import { client } from "$lib/client";
let temperature = $state(24);

async function setMode(mode: "cool" | "dry" | "heat" | "off") {
	console.log(`aircon mode: ${mode}`);
	// await client.aircon.mode.mutate({ mode });
}

async function setTemperature(temp: number) {
	console.log(`aircon temperature: ${temp}`);
	// await client.aircon.temperature.mutate({ temp });
}

function adjustTemperature(direction: "up" | "down") {
	if (direction === "up") {
		temperature++;
	} else {
		temperature--;
	}
	setTemperature(temperature);
}
</script>

<div class="w-full max-w-xs p-4 space-y-4">
  <div class="grid grid-cols-2 gap-4">
    <button class="btn btn-info btn-lg" onclick={() => setMode('cool')}>冷房</button>
    <button class="btn btn-success btn-lg" onclick={() => setMode('dry')}>除湿</button>
    <button class="btn btn-warning btn-lg" onclick={() => setMode('heat')}>暖房</button>
    <button class="btn btn-error btn-lg" onclick={() => setMode('off')}>停止</button>
  </div>

  <div class="card bg-base-200">
    <div class="card-body items-center text-center">
      <h2 class="card-title">温度設定</h2>
      <div class="text-5xl font-bold">{temperature}°C</div>
      <div class="join w-full">
        <button class="join-item btn btn-lg flex-1" onclick={() => adjustTemperature('up')}><ChevronUp /></button>
        <button class="join-item btn btn-lg flex-1" onclick={() => adjustTemperature('down')}><ChevronDown /></button>
      </div>
    </div>
  </div>
</div>
