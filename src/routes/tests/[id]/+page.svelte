<script lang="ts">
	import { page } from '$app/stores';
	import UserProfile from '$lib/components/tests/userProfile.svelte';
	import { BarChart, Chart, ColorRamp, Pie, PieChart, Svg } from 'layerchart';

	let { data } = $props();

	const graphData = [
		{
			value: data.successRate,
			color: 1
		},
		{
			value: 100 - data.successRate,
			color: 0
		}
	];

	const keyColors = ['#51c6aa', '#cf7d6d'];
</script>

<div class="w-full p-8">
	<h1 class="text-2xl font-semibold">Test results: {data.test.name}</h1>
	<div class="mt-4 grid w-full grid-cols-2 gap-4">
		<div class="flex h-fit items-center rounded-lg border bg-background-950 p-4 shadow">
			<div class="w-1/3 text-center">
				<h3 class="text-xl font-semibold">Risky behaviour:</h3>
				<h2 class="text-4xl font-bold text-[#cf7d6d]">{graphData[1].value}%</h2>
				<h3 class="mt-8 font-semibold">Safe behaviour:</h3>
				<h2 class="text-3xl font-bold text-[#51c6aa]">{graphData[0].value}%</h2>
			</div>
			<div class="h-72 grow p-4">
				<Chart data={graphData} x="value" c="color" cRange={keyColors}>
					<Svg center>
						<Pie innerRadius={100} padAngle={0.03} />
					</Svg>
				</Chart>
			</div>
		</div>

		<div
			class="h-fit max-h-[50vh] grow overflow-y-scroll rounded-lg border bg-background-950 p-4 shadow"
		>
			<h2 class="mb-4 font-semibold">Participants:</h2>

			{#each $page.data.logs as log}
				<UserProfile {log} />
			{/each}

			<!-- <UserProfile /> -->
			<!-- <UserProfile />
			<UserProfile passed={true} /> -->
		</div>
	</div>
</div>
