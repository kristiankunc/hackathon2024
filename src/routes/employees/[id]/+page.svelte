<script lang="ts">
	import { page } from '$app/stores';

	console.log($page.data.employee);
</script>

{#if !$page.data.employee}
	<h1>Employee not found</h1>
{/if}

<div>
	<p>User data</p>
	<h1>{$page.data.employee.firstName} {$page.data.employee.lastName}</h1>
	<p>{$page.data.employee.email}</p>
	<p>{$page.data.employee.category.name} ({$page.data.employee.category.description})</p>
</div>

<div>
	<p>Tests participated</p>
	{#if !$page.data.employee.tests.length}
		<p>No tests participated</p>
	{/if}
	{#each $page.data.employee.tests as test}
		<div>
			<p>{test.name}</p>
			<p>{test.description}</p>
		</div>
	{/each}
</div>
