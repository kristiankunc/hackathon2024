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

<div class="p-8">
	<div class="mb-8">
		<h1 class="text-2xl font-semibold">Create a New Test</h1>
		<p class="text-primary">Fill out the form below to create a new test.</p>
	</div>

	<section class="rounded-lg bg-background-950 p-6 shadow">
		<form class="space-y-6" method="POST" action="?/createTest">
			<div>
				<label for="test-name" class="primary block text-sm font-semibold">Test Name</label>
				<input
					id="test-name"
					type="text"
					name="name"
					placeholder="Enter test name"
					class="mt-1 w-full rounded-lg border bg-background px-4 py-2 outline-none"
					required
				/>
			</div>

			<div>
				<label for="test-description" class="primary block text-sm font-semibold"
					>Test Description</label
				>
				<input
					id="test-description"
					type="text"
					name="description"
					placeholder="Enter test description"
					class="mt-1 w-full rounded-lg border bg-background px-4 py-2 outline-none"
					required
				/>
			</div>

			<div>
				<h2 class="primary block text-sm font-semibold">Test Category</h2>
				<div class="mt-2 space-y-2">
					<div class="flex items-center">
						<input
							type="radio"
							id="category-email"
							name="category"
							value="email"
							bind:group={selectedCategory}
							class="h-4 w-4 border text-accent outline-none"
							checked
						/>
						<label for="category-email" class="ml-2 text-sm">Email</label>
					</div>
					<div class="flex items-center">
						<input
							type="radio"
							id="category-sms"
							name="category"
							value="sms"
							bind:group={selectedCategory}
							class="h-4 w-4 border text-accent outline-none"
						/>
						<label for="category-sms" class="ml-2 text-sm">SMS</label>
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
						<label for="category-telephone" class="ml-2 text-sm">Telephone</label>
					</div>
				</div>
			</div>

			<div>
				<label for="employee-group" class="primary text-sm font-semibold">Employee Group</label>
				<select
					id="employee-group"
					name="employeeGroup"
					bind:value={selectedGroup}
					class="mt-1 rounded-lg border bg-background p-2 outline-none"
				>
					<option value="" disabled selected>Choose a group</option>
					{#each data.groups as group}
						<option value={group.name.toLowerCase()}>{group.name}</option>
					{/each}
				</select>
			</div>

			<div>
				<label for="test-subject" class="primary block text-sm font-semibold">Email Subject</label>
				<input
					id="test-subject"
					type="text"
					name="subject"
					placeholder="Enter email subject"
					class="mt-1 w-full rounded-lg border bg-background px-4 py-2 outline-none"
					required
				/>
			</div>

			<div class="flex gap-4">
				<div class="flex-1">
					<div class="mb-2 flex w-full items-center justify-between">
						<label for="html-editor" class="text-lg font-semibold">HTML Editor</label>
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
						<div
							class="rounded-l-lg bg-background-900 px-2 py-4 text-center font-semibold leading-5 text-primary"
						>
							{#each lineNumbers as line}
								<div>{line}</div>
							{/each}
						</div>
						<textarea
							id="html-editor"
							name="content"
							bind:value={messageContent}
							onkeydown={handleKeyDown}
							class="min-h-64 w-full resize-none overflow-hidden rounded-r-lg bg-background p-4 font-mono text-sm leading-5 outline-none"
							oninput={updateLineNumbers}
						></textarea>
					</div>
				</div>

				{#if selectedCategory === 'email'}
					<div class="flex-1">
						<iframe
							srcdoc={messageContent}
							title="HTML preview"
							class="h-full w-full overflow-visible rounded-lg border border-background-950 bg-background"
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
