<script lang="ts">
	import { client } from "$lib/client";
	import { toast } from "svelte-sonner";

	let password = $state("");
	let loading = $state(false);

	async function login() {
		loading = true;
		const res = await client.api.auth.create.$post({
			json: {
				password,
			},
		});
		if (res.ok) {
			toast.success("Logged in successfully");
			location.reload();
		} else {
			const { error } = (await res.json()) as { error: string };
			toast.error(error);
		}
		loading = false;
	}
</script>

<div class="grow flex flex-col items-center justify-center">
	<div class="w-full max-w-xs">
		<form
			class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
			onsubmit={login}
		>
			<div class="mb-4">
				<label
					class="block text-gray-700 text-sm font-bold mb-2"
					for="password"
				>
					Password
				</label>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
					id="password"
					type="password"
					placeholder="password"
					bind:value={password}
				>
			</div>
			<div class="flex items-center justify-between">
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="submit"
					disabled={loading}
				>
					{#if loading}
					<span>Loading...</span>
					{:else}
					<span>Sign In</span>
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>
