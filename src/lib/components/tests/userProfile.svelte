<script lang="ts">
	const mail = 'test@example.com';
	const name = 'Šimon Bendl';
	let { passed = false } = $props();

	import CircleUser from 'lucide-svelte/icons/circle-user';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import Check from 'lucide-svelte/icons/check';
	import Ban from 'lucide-svelte/icons/ban';
	import Button from '../ui/button.svelte';
	// import Button from '../ui/button/button.svelte';
</script>

<div class="bg-background mb-2 flex w-full items-center justify-between rounded-lg p-4">
	<div class="flex items-center gap-4">
		<CircleUser />
		<h3 class="font-semibold">{name}</h3>
		<h4 class="text-sm">{mail}</h4>
	</div>
	{#if passed}
		<Check class="text-[#51c6aa]" />
	{:else}
		<Ban class="text-[#cf7d6d]" />
	{/if}
	<Button preset="skeleton">
		<Ellipsis />
	</Button>
</div>
