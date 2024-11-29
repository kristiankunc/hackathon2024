<script lang="ts">
	import Button from '../ui/button.svelte';

	let { propTests } = $props();
	console.log(propTests);
</script>

<div class="rounded-lg border bg-background">
	<table class="w-full divide-y divide-background-900 overflow-hidden rounded-lg">
		<thead class="bg-primary text-background">
			<tr>
				<th scope="col" class="px-6 py-3 text-left text-sm font-semibold tracking-wider">Created</th
				>
				<th scope="col" class="px-6 py-3 text-left text-sm font-semibold tracking-wider">Name</th>
				<th scope="col" class="px-6 py-3 text-left text-sm font-semibold tracking-wider">
					Description
				</th>
				<th scope="col" class="px-6 py-3 text-left text-sm font-semibold tracking-wider">
					Success Rate
				</th>
				<th scope="col" class="px-6 py-3 text-left text-sm font-semibold tracking-wider">Actions</th
				>
			</tr>
		</thead>
		<tbody class="divide-y divide-gray-200">
			{#each propTests as test}
				<tr class="hover:bg-background-950">
					<td class="px-6 py-4">{test.createdAt.toLocaleDateString()}</td>
					<td class="px-6 py-4">{test.name}</td>
					<td class="px-6 py-4">{test.description}</td>
					<td class="px-6 py-4">{Math.round(test.successRate)}%</td>
					<td class="px-6 py-4">
						<Button preset="skeleton" href={`/tests/${test.id}`}>View</Button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
