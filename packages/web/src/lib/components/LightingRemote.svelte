<script lang="ts">
	import { ChevronUp, ChevronDown } from "lucide-svelte";
	import { client } from "$lib/client";
	import { toast } from "svelte-sonner";

	export let lux: number | null = null;

	async function setLight(command: "on" | "scene" | "night" | "off") {
		const res = await client.api.light.$post({ json: { command } });
		if (res.ok) {
			toast.success(`Light command '${command}' sent.`);
		} else {
			toast.error(`Failed to send light command '${command}'.`);
		}
	}

	async function adjustBrightness(direction: "up" | "down") {
		const res = await client.api.light.$post({
			json: { command: `brightness_${direction}` },
		});
		if (res.ok) {
			toast.success(`Brightness adjusted ${direction}.`);
		} else {
			toast.error(`Failed to adjust brightness.`);
		}
	}
</script>

<div class="w-full max-w-xs p-4 space-y-4">
	<div class="card bg-base-200">
		<div class="card-body items-center text-center">
			<h2 class="card-title">Illuminance</h2>
			<p class="text-2xl font-bold">{lux}lx</p>
		</div>
	</div>

	<div class="grid grid-cols-2 gap-4">
		<button class="btn btn-primary btn-lg" onclick={() => setLight('on')}>
			全光
		</button>
		<button class="btn btn-secondary btn-lg" onclick={() => setLight('scene')}>
			シーン
		</button>
		<button class="btn btn-accent btn-lg" onclick={() => setLight('night')}>
			常夜灯
		</button>
		<button class="btn btn-error btn-lg" onclick={() => setLight('off')}>
			消灯
		</button>
	</div>

	<div class="card bg-base-200">
		<div class="card-body items-center text-center">
			<h2 class="card-title">明るさ調整</h2>
			<div class="join w-full">
				<button
					class="join-item btn btn-lg flex-1"
					onclick={() => adjustBrightness('up')}
				>
					<ChevronUp/>
				</button>
				<button
					class="join-item btn btn-lg flex-1"
					onclick={() => adjustBrightness('down')}
				>
					<ChevronDown/>
				</button>
			</div>
		</div>
	</div>
</div>
