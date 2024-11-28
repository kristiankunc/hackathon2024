<script lang="ts">
	import Button from '../ui/button.svelte';

	let { propEmployees } = $props();
</script>

<div class="rounded-lg border bg-background">
	<table class="w-full divide-y divide-background-900 overflow-hidden rounded-lg">
		<thead class="bg-primary text-background">
			<tr>
				<th scope="col" class="px-6 py-3 text-left text-sm font-semibold tracking-wider">Date</th>
				<th scope="col" class="px-6 py-3 text-left text-sm font-semibold tracking-wider">Name</th>
				<th scope="col" class="px-6 py-3 text-left text-sm font-semibold tracking-wider">
					Description
				</th>
				<th scope="col" class="px-6 py-3 text-left text-sm font-semibold tracking-wider"
					>Department</th
				>
				<th scope="col" class="px-6 py-3 text-left text-sm font-semibold tracking-wider">
					Success Rate
				</th>
				<th scope="col" class="px-6 py-3 text-left text-sm font-semibold tracking-wider">Actions</th
				>
			</tr>
		</thead>
		<tbody class="divide-y divide-gray-200">
			{#each propEmployees as employee}
				<tr class="hover:bg-background-950">
					<td class="px-6 py-4">{employee.firstName}</td>
					<td class="px-6 py-4">{employee.lastName}</td>
					<td class="px-6 py-4">{employee.email}</td>
					<td class="px-6 py-4">{employee.category.name}</td>
					<td class="px-6 py-4">{employee.employeeCategoryId}%</td>
					<td class="px-6 py-4">
						<Button preset="skeleton" href={`/employees/${employee.id}`}>View</Button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
