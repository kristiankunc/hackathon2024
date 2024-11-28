<script lang="ts">
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

<div class="p-4 w-full">
	<h1 class="text-2xl font-semibold">Test results</h1>
	<h3 class="text-sm">Performed {date.getDate()}. {date.getMonth()}. {date.getFullYear()}</h3>
	<div class="mt-4 grid grid-cols-2 gap-4 w-full">
		<div class="h-[300px] rounded border p-4">
			<Chart {data} x="value" c="color" cRange={keyColors}>
				<Svg center>
					<Pie innerRadius={100} padAngle={0.03} />
				</Svg>
			</Chart>
		</div>
		<div class="h-64 grow rounded-lg bg-black"></div>
	</div>
</div>
