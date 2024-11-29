<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button.svelte';
	import { Chart, Pie, Svg } from 'layerchart';

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

{#if !$page.data.employee}
	<h1 class="mt-8 text-center text-xl font-bold text-red-500">Employee not found</h1>
{:else}
	<div class="mx-auto my-8 max-w-4xl space-y-8 rounded-lg p-4">
		<section class="rounded-lg bg-white p-6">
			<h2 class="mb-4 text-2xl font-semibold text-gray-800">Employee Information</h2>
			<h1 class="text-xl font-bold text-gray-700">
				{$page.data.employee.firstName}
				{$page.data.employee.lastName}
			</h1>
			<p class="text-gray-600">
				<strong>Email:</strong>
				{$page.data.employee.email}
			</p>
			<p class="text-gray-600">
				<strong>Department:</strong>
				{$page.data.employee.category.name}
				<span>({$page.data.employee.category.description})</span>
			</p>
		</section>

		<section class="rounded-lg bg-white p-6">
			<h2 class="mb-4 text-2xl font-semibold text-gray-800">Tests Participated</h2>
			{#if !$page.data.employee.tests || $page.data.employee.tests.length === 0}
				<p class="text-gray-600">No tests participated</p>
			{:else}
				<div class="space-y-4">
					{#each $page.data.employee.tests as test (test.id)}
						<div
							class="flex items-center justify-between rounded-lg border bg-gray-50 p-4 shadow-sm"
						>
							<div>
								<h3 class="text-lg font-medium text-gray-700">{test.name}</h3>
								<p class="text-gray-600">{test.description}</p>
							</div>
							<a href={`/tests/${test.id}`}><Button>View</Button></a>
						</div>
					{/each}
				</div>
			{/if}
		</section>

		{#if $page.data.employee.tests.length > 0}
			<section>
				<h2 class="mb-4 text-2xl font-semibold text-gray-800">Aggregated results</h2>
				<Chart data={graphData} x="value" c="color" cRange={keyColors}>
					<Svg center>
						<Pie innerRadius={100} padAngle={0.03} />
					</Svg>
				</Chart>
				<p>Clicked: {$page.data.logs.filter((log) => log.action === 'CLOCKED').length}</p>
				<p>Read: {$page.data.logs.filter((log) => log.action === 'READ').length}</p>
				<p>Sent: {$page.data.logs.filter((log) => log.action === 'SENT').length}</p>
			</section>
		{/if}
	</div>
{/if}
