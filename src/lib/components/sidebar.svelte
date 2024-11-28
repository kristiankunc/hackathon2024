<script lang="ts">
	import { onMount } from 'svelte';
	import Button from './ui/button.svelte';

	let { open = $bindable(false) }: { open: boolean } = $props();

	onMount(() => {
		const nav = document.getElementById('nav');

		$effect(() => {
			if (open) {
				nav!.classList.remove('-translate-x-64');
			} else {
				nav!.classList.add('-translate-x-64');
			}
		});
	});
</script>

<div
	id="nav"
	class="fixed bottom-0 top-16 z-40 flex w-64 -translate-x-64 flex-col items-center gap-4 bg-background-950 py-16 shadow-md transition-transform"
>
	<Button preset="borderless" href="/" click={() => (open = false)}>
		<span class="material-symbols-outlined">person</span>
		<h3>Account</h3>
	</Button>
	<Button preset="borderless" href="/" click={() => (open = false)}>
		<span class="material-symbols-outlined">phishing</span>
		<h3>Phishing</h3>
	</Button>
	<Button preset="borderless" href="/tests" click={() => (open = false)}>
		<span class="material-symbols-outlined">labs</span>
		<h3>Tests</h3>
	</Button>
	<Button preset="borderless" href="/employees" click={() => (open = false)}>
		<span class="material-symbols-outlined">badge</span>
		<h3>Employees</h3>
	</Button>
	<div class="grow"></div>
	<Button preset="borderless" click={() => (open = false)}>
		<span class="material-symbols-outlined">settings</span>
		<h3>Settings</h3>
	</Button>
</div>
