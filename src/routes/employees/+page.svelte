<script lang="ts">
	import EmployeesTable from '$lib/components/employees/employeesTable.svelte';
	import Button from '$lib/components/ui/button.svelte';

	let { data } = $props();

	// State for selected group
	let selectedGroup = '';

	// Reactive filtered employees based on selected group
	let filteredEmployees = $state(selectedGroup
		? data.employees.filter((employee: any) => employee.category.name === selectedGroup)
		: data.employees);

	const onSelectedGroupChange = (event: Event) => {
		const select = event.target as HTMLSelectElement;
		selectedGroup = select.value === "" ? "" : select.innerText;
		filteredEmployees = selectedGroup
			? data.employees.filter((employee: any) => employee.category.name === selectedGroup)
			: data.employees;
	};
</script>

<div class="p-8">
	<Button
		href="/employees/create"
		disableDefaults={true}
		additionalStyle="rounded-full transition-colors p-2 w-16 h-16 fixed bottom-12 right-12 flex justify-center items-center"
	>
		<span class="material-symbols-outlined">add</span>
	</Button>
	<h1 class="mb-4 text-2xl font-bold">Employee Management Dashboard</h1>
	<section class="rounded-lg border bg-background-950 p-6 shadow">
		<h2 class="mb-4 text-lg font-semibold">List of employees</h2>
		<div class="mb-4 flex justify-end">
			<select class="rounded border p-2" bind:value={selectedGroup}>
				<option onclick={onSelectedGroupChange} value="">All Groups</option>
				{#each data.groups as group}
					<option onclick={onSelectedGroupChange} value={group.id}>{group.name}</option>
				{/each}
			</select>
		</div>
		{#if filteredEmployees?.length > 0}
			<EmployeesTable propEmployees={filteredEmployees} />
		{:else}
			<p class="text-primary">No employees found. Please add or import new employees.</p>
		{/if}
	</section>
</div>
