<script lang="ts">
	import UserProfile from '$lib/components/testResult/userProfile.svelte';
	import { BarChart, Chart, ColorRamp, Pie, PieChart, Svg } from 'layerchart';

	const date = new Date();

	const data = [
		{
			value: 25,
			color: 1
		},
		{
			value: 75,
			color: 0
		}
	];

	const keyColors = ['#435fcb', '#d873d0'];
</script>

<div class="w-full p-4">
	<h1 class="text-2xl font-semibold">Test results</h1>
	<h3 class="text-sm">Performed {date.getDate()}. {date.getMonth()}. {date.getFullYear()}</h3>
	<div class="mt-4 grid w-full grid-cols-2 gap-4">
		<div class="flex h-fit items-center rounded-lg border p-4">
			<div class="w-1/3 text-center">
				<h3 class="text-xl font-semibold">Risky behaviour:</h3>
				<h2 class="text-accent text-4xl font-bold">{data[1].value}%</h2>
				<h3 class="mt-8 font-semibold">Safe behaviour:</h3>
				<h2 class="text-primary text-3xl font-bold">{data[0].value}%</h2>
			</div>
			<div class="h-72 grow p-4">
				<Chart {data} x="value" c="color" cRange={keyColors}>
					<Svg center>
						<Pie innerRadius={100} padAngle={0.03} />
					</Svg>
				</Chart>
			</div>
		</div>

		<div class="max-h-[50vh] h-fit grow rounded-lg overflow-y-scroll border p-4">
			<h2 class="font-semibold mb-4">Participants:</h2>
			<UserProfile />
			<UserProfile />
			<UserProfile passed={true} />
		</div>
	</div>
</div>
