<script lang="ts">
	// No additional script is needed unless further interactivity is required
</script>

<div class="px-8 py-4">
	<div class="mb-6">
		<h1 class="text-2xl font-bold text-gray-800">Create a New Employee</h1>
		<p class="text-gray-600">Fill out the form below to add a new employee.</p>
	</div>

	<section class="rounded bg-white p-6 shadow">
		<form class="space-y-6" method="POST" action="?/createEmployee">
			<div>
				<label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
				<input
					id="firstName"
					name="firstName"
					type="text"
					required
					placeholder="Enter first name"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
			</div>

			<div>
				<label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
				<input
					id="lastName"
					name="lastName"
					type="text"
					required
					placeholder="Enter last name"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
			</div>

			<div>
				<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					placeholder="Enter email address"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
			</div>

			<div>
				<label for="employeeCategoryId" class="block text-sm font-medium text-gray-700"
					>Category ID</label
				>
				<input
					id="employeeCategoryId"
					name="employeeCategoryId"
					type="number"
					min="1"
					required
					placeholder="Enter category ID"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
			</div>

			<div class="flex justify-end">
				<button
					type="submit"
					class="rounded bg-green-600 px-6 py-2 text-white shadow transition hover:bg-green-700"
				>
					Create Employee
				</button>
			</div>
		</form>
	</section>
</div>
