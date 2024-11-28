<script lang="ts">
	import TestTable from '$lib/components/tests/testTable.svelte';

	let { data } = $props();
</script>

<div class="px-8 py-4">
	<a href="/tests/create" aria-label="Add Test" class="fixed bottom-12 right-12">
		<button
			aria-label="Add Test"
			class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-8 w-8"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
			</svg>
		</button>
	</a>
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
