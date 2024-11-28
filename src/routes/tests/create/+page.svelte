<script lang="ts">
</script>

<div class="px-8 py-4">
	<header class="mb-6">
		<h1 class="text-2xl font-bold text-gray-800">Create a New Test</h1>
		<p class="text-gray-600">Fill out the form below to create a new test.</p>
	</header>

	<section class="rounded bg-white p-6 shadow">
		<form class="space-y-6" method="POST" action="?/createTest">
			<div>
				<label class="block text-sm font-medium text-gray-700">Test Name</label>
				<input
					type="text"
					name="name"
					placeholder="Enter test name"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700">Admins</label>
				<div class="mt-1 flex space-x-2">
					<input
						type="text"
						placeholder="Add admin"
						class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
					<button
						type="button"
						class="rounded bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700"
					>
						Add
					</button>
				</div>
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700">Employees</label>
				<div class="mt-1 flex space-x-2">
					<input
						type="text"
						placeholder="Add employee"
						class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
					<button
						type="button"
						class="rounded bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700"
					>
						Add
					</button>
				</div>
			</div>

			<div class="flex justify-end">
				<button
					type="submit"
					class="rounded bg-green-600 px-6 py-2 text-white shadow transition hover:bg-green-700"
				>
					Create Test
				</button>
			</div>
		</form>
	</section>
</div>
