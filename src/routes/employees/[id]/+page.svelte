<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button.svelte';
	import { Chart, Pie, Svg } from 'layerchart';

  console.log($page.data);

	const graphData = [
		{
			value: $page.data.successRate,
			color: 1
		},
		{
			value: 100 - $page.data.successRate,
			color: 0
		}
	];

	const keyColors = ['#51c6aa', '#cf7d6d'];
</script>

<h2 class="m-8 mb-4 text-center text-2xl font-semibold">Employee information</h2>
{#if !$page.data.employee}
	<h2 class="text-center text-xl font-bold text-secondary">Employee not found</h2>
{:else}
	<div class="mx-auto w-2/3 rounded-lg border bg-background-950 p-4 shadow">
		<h2 class="flex items-center gap-1 text-xl font-semibold">
			<span class="material-symbols-outlined">person</span>
			{$page.data.employee.firstName}
			{$page.data.employee.lastName}
		</h2>
		<h3 class="mb-4 text-sm text-primary">{$page.data.employee.email}</h3>
		<h3><b>Department:</b> {$page.data.employee.category.description}</h3>
	</div>
	<div class="mx-auto mt-8 w-2/3 rounded-lg border bg-background-950 p-4 shadow">
		<h2 class="mb-4 text-sm font-semibold">Tests participated</h2>

		{#if !$page.data.employee.tests || $page.data.employee.tests.length == 0}
			<h3>No tests participated</h3>
		{:else}
			{#each $page.data.employee.tests as test (test.id)}
				<div class="mb-2 flex items-center justify-between rounded-lg bg-background p-4">
					<div>
						<h3 class="text-lg font-semibold">{test.name}</h3>
						<p class="text-primary">{test.description}</p>
					</div>
					<Button href="/tests/{test.id}" preset="skeleton">View</Button>
				</div>
			{/each}
		{/if}
	</div>

	<div
		class="mx-auto my-8 flex h-fit w-2/3 items-center rounded-lg border bg-background-950 p-4 shadow"
	>
		<div class="w-1/3 text-center">
			<h3 class="text-xl font-semibold">Risky behaviour:</h3>
			<h2 class="text-4xl font-bold text-[#cf7d6d]">{graphData[1].value}%</h2>
			<h3 class="mt-8 font-semibold">Safe behaviour:</h3>
			<h2 class="text-3xl font-bold text-[#51c6aa]">{graphData[0].value}%</h2>
		</div>
		<div class="h-72 grow p-4">
			<Chart data={graphData} x="value" c="color" cRange={keyColors}>
				<Svg center>
					<Pie innerRadius={100} />
				</Svg>
			</Chart>
		</div>
	</div>
	<!-- <div class="mx-auto my-8 max-w-4xl space-y-8 rounded-lg p-4"> -->
	<!-- 	<section class="rounded-lg bg-white p-6"> -->
	<!-- 		<h2 class="mb-4 text-2xl font-semibold text-gray-800">Employee Information</h2> -->
	<!-- 		<h1 class="text-xl font-bold text-gray-700"> -->
	<!-- 			{$page.data.employee.firstName} -->
	<!-- 			{$page.data.employee.lastName} -->
	<!-- 		</h1> -->
	<!-- 		<p class="text-gray-600"> -->
	<!-- 			<strong>Email:</strong> -->
	<!-- 			{$page.data.employee.email} -->
	<!-- 		</p> -->
	<!-- 		<p class="text-gray-600"> -->
	<!-- 			<strong>Department:</strong> -->
	<!-- 			{$page.data.employee.category.name} -->
	<!-- 			<span>({$page.data.employee.category.description})</span> -->
	<!-- 		</p> -->
	<!-- 	</section> -->
	<!---->
	<!-- 	<section class="rounded-lg bg-white p-6"> -->
	<!-- 		<h2 class="mb-4 text-2xl font-semibold text-gray-800">Tests Participated</h2> -->
	<!-- 		{#if !$page.data.employee.tests || $page.data.employee.tests.length === 0} -->
	<!-- 			<p class="text-gray-600">No tests participated</p> -->
	<!-- 		{:else} -->
	<!-- 			<div class="space-y-4"> -->
	<!-- 				{#each $page.data.employee.tests as test (test.id)} -->
	<!-- 					<div -->
	<!-- 						class="flex items-center justify-between rounded-lg border bg-gray-50 p-4 shadow-sm" -->
	<!-- 					> -->
	<!-- 						<div> -->
	<!-- 							<h3 class="text-lg font-medium text-gray-700">{test.name}</h3> -->
	<!-- 							<p class="text-gray-600">{test.description}</p> -->
	<!-- 						</div> -->
	<!-- 						<a href={`/tests/${test.id}`}><Button>View</Button></a> -->
	<!-- 					</div> -->
	<!-- 				{/each} -->
	<!-- 			</div> -->
	<!-- 		{/if} -->
	<!-- 	</section> -->
	<!---->
	<!-- 	{#if $page.data.employee.tests.length > 0} -->
	<!-- 		<section> -->
	<!-- 			<h2 class="mb-4 text-2xl font-semibold text-gray-800">Aggregated results</h2> -->
	<!-- 			<Chart data={graphData} x="value" c="color" cRange={keyColors}> -->
	<!-- 				<Svg center> -->
	<!-- 					<Pie innerRadius={100} padAngle={0.03} /> -->
	<!-- 				</Svg> -->
	<!-- 			</Chart> -->
	<!-- 			<p>Clicked: {$page.data.logs.filter((log) => log.action === 'CLOCKED').length}</p> -->
	<!-- 			<p>Read: {$page.data.logs.filter((log) => log.action === 'READ').length}</p> -->
	<!-- 			<p>Sent: {$page.data.logs.filter((log) => log.action === 'SENT').length}</p> -->
	<!-- 		</section> -->
	<!-- 	{/if} -->
	<!-- </div> -->
{/if}
