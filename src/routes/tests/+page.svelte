<script lang="ts">
	import TestTable from '$lib/components/testTable.svelte';

	// let { data } = $props();
	let data = {
		tests: [
			{
				id: 1,
				date: '2021-10-01',
				name: 'Test 1',
				description: 'This is a test',
				successRate: '100%'
			},
			{
				id: 2,
				date: '2021-10-02',
				name: 'Test 2',
				description: 'This is a test',
				successRate: '100%'
			},
			{
				id: 3,
				date: '2021-10-03',
				name: 'Test 3',
				description: 'This is a test',
				successRate: '100%'
			}
		]
	};
</script>

<div class="px-8 py-4">
	<h1 class="mb-4 text-2xl font-bold">Test Management Dashboard</h1>
	<section class="rounded bg-white p-6 shadow">
		<h2 class="mb-4 text-lg font-semibold">List of Tests</h2>
		{#if data.tests?.length > 0}
			<TestTable propTests={data.tests} />
		{:else}
			<p class="text-gray-500">No tests found. Please add a new test.</p>
		{/if}
	</section>
</div>
