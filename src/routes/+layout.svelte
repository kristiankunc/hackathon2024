<script lang="ts">
	import Error, { showError } from '$lib/components/error.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { page } from '$app/stores';

	let { children } = $props();
	let sidebarOpen = $state(false);

	onMount(() => {
		if ($page.form?.title) {
			showError($page.form?.title, $page.form?.details);
		}
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
</svelte:head>

<Error />
<Navbar bind:sidebarOpen />
<div class="transition-[margin-left] {sidebarOpen ? 'ml-64' : 'ml-0'}">{@render children?.()}</div>
