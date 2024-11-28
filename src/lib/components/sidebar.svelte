<script lang="ts">
	import { onMount } from 'svelte';
	import Button from './ui/button.svelte';

	let { open = false }: { open: boolean } = $props();

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
	class="bg-background-950 fixed flex gap-4 top-16 bottom-0 w-64 -translate-x-64 flex-col items-center py-16 shadow-md transition-transform"
>
	<Button style="flex gap-2">
		<span class="material-symbols-outlined">person</span>
		<h3>Account</h3>
	</Button>
	<Button style="flex gap-2">
		<span class="material-symbols-outlined">phishing</span>
		<h3>Phishing</h3>
	</Button>
	<Button style="flex gap-2">
		<span class="material-symbols-outlined">labs</span>
		<h3>Tests</h3>
	</Button>
  <div class="grow"></div>
	<Button style="flex gap-2">
		<span class="material-symbols-outlined">settings</span>
		<h3>Settings</h3>
	</Button>
</div>
