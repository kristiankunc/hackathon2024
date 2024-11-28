<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<Navbar />
<<<<<<< HEAD
<Sidebar.Provider>
	<AppSidebar />
	<main class="w-full">
		<Navbar />
		<Sidebar.Trigger class="m-2" />
		{@render children?.()}
	</main>
</Sidebar.Provider>
=======
{@render children?.()}
>>>>>>> 4efdb70dabc49f98c40b8ff1b7c05ce8f0473f32
