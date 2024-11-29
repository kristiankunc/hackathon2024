<script lang="ts">
	import { page } from '$app/stores';
	import UserProfile from '$lib/components/tests/userProfile.svelte';
	import { BarChart, Chart, ColorRamp, Pie, PieChart, Svg } from 'layerchart';
	import { onMount } from 'svelte';

	let { data } = $props();

	const graphData = [
		{
			value: data.actionRates.sent,
			color: 2
		},
		{
			value: data.actionRates.clicked,
			color: 1
		},
		{
			value: data.actionRates.read,
			color: 0
		}
	];

	const keyColors = ['#51c6aa', '#cf7d6d', 'black'];
</script>

<div class="w-full p-8">
	<h1 class="text-2xl font-semibold">Test results: {data.test.name}</h1>
	<div class="mt-4 grid w-full grid-cols-2 gap-4">
		<div class="flex h-fit items-center rounded-lg border bg-background-950 p-4 shadow">
			<div class="w-1/3 text-center">
				<h3 class="text-xl font-semibold">Risky behaviour:</h3>
				<h2 class="text-4xl font-bold text-[#cf7d6d]">{graphData[1].value}%</h2>
				<h3 class="mt-8 text-sm font-semibold">
					<span class="mr-1 text-xs font-medium">(mostly)</span>Safe behaviour:
				</h3>
				<h2 class="text-2xl font-bold text-[#51c6aa]">
					{graphData[0].value + graphData[2].value}%
				</h2>
			</div>
			<div class="h-72 grow p-4">
				<Chart data={graphData} x="value" c="color" cRange={keyColors}>
					<Svg center>
						<Pie innerRadius={100} />
					</Svg>
				</Chart>
			</div>
		</div>

		<div
			class="h-fit max-h-[50vh] grow overflow-y-scroll rounded-lg border bg-background-950 p-4 shadow"
		>
			<h2 class="mb-4 font-semibold">Participants:</h2>

			{#each data.employeesClicked as employee, i}
				<UserProfile {employee} action="CLICKED" />
			{/each}
			{#each data.employeesRead as employee, i}
				<UserProfile {employee} action="READ" />
			{/each}
			{#each data.employeesSent as employee, i}
				<UserProfile {employee} action="SENT" />
			{/each}

			<!-- <UserProfile /> -->
			<!-- <UserProfile />
			<UserProfile passed={true} /> -->
		</div>
	</div>
</div>
