<script lang="ts">
	let selectedCategory = $state('');
	let selectedGroup = $state('');
	let messageContent = $state('h1>Hello, world!</h1>\n<p>Edit the HTML in the textarea below.</p>');

	let lineNumbers: number[] = $state([]);

	const updateLineNumbers = () => {
		lineNumbers = messageContent.split('\n').map((_, i) => i + 1);
	};

	updateLineNumbers();

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Tab') {
			e.preventDefault();

			const textarea = e.target;
			if (!(textarea instanceof HTMLTextAreaElement)) return;

			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;

			const indent = '  ';
			const before = messageContent.substring(0, start);
			const after = messageContent.substring(end);

			messageContent = before + indent + after;

			requestAnimationFrame(() => {
				textarea.setSelectionRange(start + indent.length, start + indent.length);
				textarea.focus();
			});

			updateLineNumbers();
		}
	};
</script>

<div class="px-8 py-4">
	<div class="mb-6">
		<h1 class="text-2xl font-bold text-gray-800">Create a New Test</h1>
		<p class="text-gray-600">Fill out the form below to create a new test.</p>
	</div>

	<section class="rounded bg-white p-6 shadow">
		<form class="space-y-6" method="POST" action="?/createTest">
			<div>
				<label for="test-name" class="block text-sm font-medium text-gray-700">Test Name</label>
				<input
					id="test-name"
					type="text"
					name="name"
					placeholder="Enter test name"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
			</div>

			<div>
				<label for="test-description" class="block text-sm font-medium text-gray-700"
					>Test Description</label
				>
				<input
					id="test-name"
					type="text"
					name="description"
					placeholder="Enter test description"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
			</div>

			<div>
				<h2 class="block text-sm font-medium text-gray-700">Test Category</h2>
				<div class="mt-2 space-y-2">
					<div class="flex items-center">
						<input
							type="radio"
							id="category-email"
							name="category"
							value="email"
							bind:group={selectedCategory}
							class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
						/>
						<label for="category-email" class="ml-2 text-sm text-gray-700">Email</label>
					</div>
					<div class="flex items-center">
						<input
							type="radio"
							id="category-sms"
							name="category"
							value="sms"
							bind:group={selectedCategory}
							class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
						/>
						<label for="category-sms" class="ml-2 text-sm text-gray-700">SMS</label>
					</div>
					<div class="flex items-center">
						<input
							type="radio"
							id="category-telephone"
							name="category"
							value="telephone"
							bind:group={selectedCategory}
							class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
						/>
						<label for="category-telephone" class="ml-2 text-sm text-gray-700">Telephone</label>
					</div>
				</div>
			</div>

			<div>
				<label for="employee-group" class="block text-sm font-medium text-gray-700"
					>Employee Group</label
				>
				<select
					id="employee-group"
					name="employeeGroup"
					bind:value={selectedGroup}
					class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				>
					<option value="" disabled selected>Choose a group</option>
					<option value="management">IT</option>
					<option value="engineering">HR</option>
					<option value="sales">Sales</option>
					<option value="support">Support</option>
				</select>
			</div>

			<div class="relative w-full md:w-1/2">
				<label for="html-editor" class="mb-2 block text-lg font-medium">HTML Editor</label>
				<div class="flex">
					<div class="bg-gray-100 px-2 py-4 text-center leading-5 text-gray-500">
						{#each lineNumbers as line}
							<div>{line}</div>
						{/each}
					</div>
					<textarea
						id="html-editor"
						name="content"
						bind:value={messageContent}
						onkeydown={handleKeyDown}
						class="h-64 w-full resize-none rounded-r-lg border-l border-gray-300 bg-gray-50 p-4 font-mono text-sm leading-5 focus:ring focus:ring-blue-300"
						oninput={updateLineNumbers}
					></textarea>
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

	{#if selectedCategory === 'email'}
		<div>
			<h2 class="mt-6 text-xl font-bold text-gray-800">HTML preview</h2>
			<iframe
				srcdoc={messageContent}
				title="HTML preview"
				class="h-80 w-full border border-gray-300"
			></iframe>
		</div>
	{/if}
</div>
