<script lang="ts">
	import Button from '../ui/button.svelte';

	let { propEmployees } = $props();
</script>

<table class="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg shadow-sm">
	<thead class="bg-primary text-white">
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
		{#each propEmployees as employee}
			<tr class="hover:bg-gray-100">
				<td class="px-6 py-4">{employee.firstName}</td>
				<td class="px-6 py-4">{employee.lastName}</td>
				<td class="px-6 py-4">{employee.email}</td>
				<td class="px-6 py-4">{employee.employeeCategoryId}%</td>
				<td class="px-6 py-4">
					<Button>View</Button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
