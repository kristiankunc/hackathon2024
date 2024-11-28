<script lang="ts">
	import Button from '../ui/button.svelte';

	let { propTests } = $props();
</script>

<div class="rounded-lg border bg-background">
	<table class="w-full divide-y rounded-lg divide-background-900 overflow-hidden">
		<thead class="bg-primary text-background">
			<tr>
				<th scope="col" class="px-6 py-3 text-left text-sm font-medium tracking-wider">Date</th>
				<th scope="col" class="px-6 py-3 text-left text-sm font-medium tracking-wider">Name</th>
				<th scope="col" class="px-6 py-3 text-left text-sm font-medium tracking-wider">
					Description
				</th>
				<th scope="col" class="px-6 py-3 text-left text-sm font-medium tracking-wider">
					Success Rate
				</th>
				<th scope="col" class="px-6 py-3 text-left text-sm font-medium tracking-wider">Actions</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-gray-200">
			{#each propTests as test}
				<tr class="hover:bg-background-950">
					<td class="px-6 py-4">{test.date}</td>
					<td class="px-6 py-4">{test.name}</td>
					<td class="px-6 py-4">{test.description}</td>
					<td class="px-6 py-4">{test.successRate}%</td>
					<td class="px-6 py-4">
						<Button preset="skeleton">View</Button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
