<script lang="ts">
	import EmployeesTable from '$lib/components/employees/employeesTable.svelte';
	import Button from '$lib/components/ui/button.svelte';

	let { data } = $props();
</script>

<div class="px-8 py-4">
	<Button
		href="/employees/create"
		disableDefaults={true}
		additionalStyle="rounded-full transition-colors p-2 w-16 h-16 fixed bottom-12 right-12 flex justify-center items-center"
	>
		<span class="material-symbols-outlined">add</span>
	</Button>
	<h1 class="mb-4 text-2xl font-bold">Employee Management Dashboard</h1>
	<section class="rounded-lg border p-6 shadow bg-background-950">
		<h2 class="mb-4 text-lg font-semibold">List of employees</h2>
		{#if data.employees?.length > 0}
			<EmployeesTable propEmployees={data.employees} />
		{:else}
			<p class="text-primary">No employees found. Please add or import new employees.</p>
		{/if}
	</section>
</div>
