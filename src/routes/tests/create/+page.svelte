<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';

	let selectedCategory = $state('email');
	let selectedGroup = $state('');
	let messageContent = $state(
		'<h1>Hello, world!</h1>\n<p>Edit the HTML in the textarea below.</p>'
	);

	let lineNumbers: number[] = $state([]);
	let { data } = $props();

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

	let selectedFileName: string = $state('No file chosen');

	const handleFileChange = (event: Event): void => {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		console.log(file);

		if (file && file.type === 'text/html') {
			file.text().then((text) => {
				messageContent = text;
				updateLineNumbers();
			});
		}

		selectedFileName = file ? file.name : 'No file chosen';
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
					required
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
					required
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
							checked
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
					{#each data.groups as group}
						<option value={group.name.toLowerCase()}>{group.name}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="test-subject" class="block text-sm font-medium text-gray-700">Email Subject</label>
				<input
					id="test-subject"
					type="text"
					name="subject"
					placeholder="Enter email subject"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					required
				/>
			</div>

			<div class="flex gap-4">
				<div class="flex-1">
					<div class="mb-2 flex w-full items-center justify-between">
						<label for="html-editor" class="mb-2 block text-lg font-medium">HTML Editor</label>
						<div class="flex items-center space-x-4">
							<input type="file" id="file-input" class="hidden" onchange={handleFileChange} />

							<label
								for="file-input"
								class="cursor-pointer rounded-lg border border-primary bg-primary p-2 text-background transition hover:bg-background hover:text-primary focus:outline-none"
							>
								Choose File
							</label>

							<span id="file-name" class="text-gray-700">{selectedFileName}</span>
						</div>
					</div>
					<div class="flex">
						<div class="rounded-l-lg bg-gray-100 px-2 py-4 text-center leading-5 text-gray-500">
							{#each lineNumbers as line}
								<div>{line}</div>
							{/each}
						</div>
						<textarea
							id="html-editor"
							name="content"
							bind:value={messageContent}
							onkeydown={handleKeyDown}
							class="min-h-64 w-full resize-none overflow-hidden rounded-r-lg border-l border-background-950 bg-background-950 p-4 font-mono text-sm leading-5 focus:ring focus:ring-blue-300"
							oninput={updateLineNumbers}
						></textarea>
					</div>
				</div>

				{#if selectedCategory === 'email'}
					<div class="flex-1">
						<iframe
							srcdoc={messageContent}
							title="HTML preview"
							class="h-full w-full overflow-visible rounded-lg border border-background-950"
						></iframe>
					</div>
				{/if}
			</div>

			<div class="flex justify-end">
				<Button type="submit">Create Test</Button>
			</div>
		</form>
	</section>
</div>
