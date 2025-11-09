<script lang="ts">
	import { ChevronUp, ChevronDown } from "lucide-svelte";
	import { client } from "$lib/client";
	import { toast } from "svelte-sonner";

	export let temperature: number | null = null;
	export let humidity: number | null = null;

	let targetTemperature = temperature;

	async function setMode(mode: "cool" | "dry" | "heat" | "off") {
		const res = await client.api.aircon.$post({ json: { mode } });
		if (res.ok) {
			toast.success(`Aircon mode set to '${mode}'.`);
		} else {
			toast.error(`Failed to set aircon mode.`);
		}
	}

	async function setTemperature(temp: number) {
		const res = await client.api.aircon.$post({ json: { temperature: temp } });
		if (res.ok) {
			toast.success(`Aircon temperature set to ${temp}°C.`);
		} else {
			toast.error(`Failed to set aircon temperature.`);
		}
	}

	function adjustTemperature(direction: "up" | "down") {
		if (!targetTemperature) return;
		if (direction === "up") {
			targetTemperature++;
		} else {
			targetTemperature--;
		}
		setTemperature(targetTemperature);
	}
</script>

<div class="w-full max-w-xs p-4 space-y-4">
	<div class="card bg-base-200">
		<div class="card-body items-center text-center">
			<h2 class="card-title">Current</h2>
			<p>Temperature: {temperature}°C</p>
			<p>Humidity: {humidity}%</p>
		</div>
	</div>

	<div class="grid grid-cols-2 gap-4">
		<button class="btn btn-info btn-lg" onclick={() => setMode('cool')}>
			冷房
		</button>
		<button class="btn btn-success btn-lg" onclick={() => setMode('dry')}>
			除湿
		</button>
		<button class="btn btn-warning btn-lg" onclick={() => setMode('heat')}>
			暖房
		</button>
		<button class="btn btn-error btn-lg" onclick={() => setMode('off')}>
			停止
		</button>
	</div>

	<div class="card bg-base-200">
		<div class="card-body items-center text-center">
			<h2 class="card-title">温度設定</h2>
			<div class="text-5xl font-bold">{targetTemperature}°C</div>
			<div class="join w-full">
				<button
					class="join-item btn btn-lg flex-1"
					onclick={() => adjustTemperature('up')}
				>
					<ChevronUp/>
				</button>
				<button
					class="join-item btn btn-lg flex-1"
					onclick={() => adjustTemperature('down')}
				>
					<ChevronDown/>
				</button>
			</div>
		</div>
	</div>
</div>
