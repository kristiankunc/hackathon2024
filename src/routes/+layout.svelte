<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import Sidebar from '$lib/components/sidebar.svelte';
	import '../app.css';

	let { children } = $props();
	let sidebarOpen = $state(false);
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
</svelte:head>

<Navbar bind:sidebarOpen />
<div class="transition-all {sidebarOpen ? 'ml-64' : 'ml-0'}">{@render children?.()}</div>
