<script lang="ts">
	const mail = 'test@example.com';
	const name = 'Šimon Bendl';
	let { passed = false } = $props();

	import CircleUser from 'lucide-svelte/icons/circle-user';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import Check from 'lucide-svelte/icons/check';
	import Ban from 'lucide-svelte/icons/ban';
<<<<<<< HEAD
	import Button from '../ui/button/button.svelte';
=======
	// import Button from '../ui/button/button.svelte';
>>>>>>> 4efdb70dabc49f98c40b8ff1b7c05ce8f0473f32
</script>

<div class="bg-background-950 mb-2 flex w-full items-center justify-between rounded-lg p-4">
	<div class="flex items-center gap-4">
		<CircleUser />
		<h3 class="font-semibold">{name}</h3>
		<h4 class="text-sm">{mail}</h4>
	</div>
	{#if passed}
		<Check class="text-primary" />
	{:else}
		<Ban class="text-accent" />
	{/if}
<<<<<<< HEAD
	<Button variant="ghost">
		<Ellipsis />
	</Button>
=======
	<!-- <Button variant="ghost"> -->
	<!-- 	<Ellipsis /> -->
	<!-- </Button> -->
>>>>>>> 4efdb70dabc49f98c40b8ff1b7c05ce8f0473f32
</div>
