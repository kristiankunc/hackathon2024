<script lang="ts" module>
	import Button from './ui/button.svelte';

	let title = $state('An error occurred');
	let message = $state('Error was lowkey unexpected, developers will not be notified');
	let isVisible = $state(false);

	let popover: HTMLDivElement;

	export function showError(_title: string, _message: string) {
		if (_title) title = _title;
		if (_message) message = _message;
		popover.showPopover();
		isVisible = true;
	}

	function hideError() {
		popover.hidePopover();
		isVisible = false;
	}
</script>

<div class="relative">
	{#if isVisible}
		<span class="fixed inset-0 z-50 bg-black bg-opacity-35 backdrop-blur-sm"></span>
	{/if}
	<div bind:this={popover} popover="manual" class="max-w-[30rem] bg-transparent">
		<div class="m-auto flex flex-col rounded-lg bg-red-500 p-4 text-white">
			<h2 class="w-full text-left text-3xl">{title}</h2>
			<p class="w-full text-wrap text-left text-lg">{message}</p>
			<Button
				click={() => hideError()}
				style="m-2 rounded-lg bg-white p-2 text-red-500 hover:bg-red-100 hover:text-red-700"
				>Alright then</Button
			>
		</div>
	</div>
</div>
