<script lang="ts">
	import TestTable from '$lib/components/tests/testTable.svelte';
	import Button from '$lib/components/ui/button.svelte';

	let { data } = $props();
</script>

<div class="p-8">
	<Button
		href="/tests/create"
		disableDefaults={true}
		additionalStyle="rounded-full transition-colors p-2 w-16 h-16 fixed bottom-12 right-12 flex justify-center items-center"
	>
		<span class="material-symbols-outlined">add</span>
	</Button>
	<h1 class="mb-4 text-2xl font-bold">Test Management Dashboard</h1>
	<section class="rounded-lg border p-6 shadow bg-background-950">
		<h2 class="mb-4 text-lg font-semibold">List of Tests</h2>
		{#if data.tests?.length > 0}
			<TestTable propTests={data.tests} />
		{:else}
			<p class="text-primary">No tests found. Please add a new test.</p>
		{/if}
	</section>
</div>
