<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import '../app.css';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';

	let { children } = $props();
</script>

<Navbar />
<Sidebar.Provider>
	<AppSidebar />
	<main class="w-full">
		<Sidebar.Trigger />
		{@render children?.()}
	</main>
</Sidebar.Provider>
