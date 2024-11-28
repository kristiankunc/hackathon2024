<script lang="ts">
	import Sidebar from './sidebar.svelte';
	import Button from './ui/button.svelte';

	let sidebarOpen = $state(false);
</script>

<header class="bg-primary text-background flex items-center justify-between px-4 py-4 shadow-md">
	<div class="flex items-center gap-4">
		<Button
			style="flex items-center"
			click={() => {
				sidebarOpen = !sidebarOpen;
			}}
		>
			<span class="material-symbols-outlined">menu</span>
		</Button>
		<a class="text-lg font-bold" href="/">LOGO</a>
	</div>
	<nav class="flex gap-12 text-white">
		<a href="/about" class="group transition duration-300">
			About
			<span class="transition-bg block h-0.5 max-w-0 bg-white duration-500 group-hover:max-w-full"
			></span>
		</a>
		<a href="/services" class="group transition duration-300">
			Services
			<span class="transition-bg block h-0.5 max-w-0 bg-white duration-500 group-hover:max-w-full"
			></span>
		</a>
		<a href="/contact" class="group transition duration-300">
			Contact
			<span class="transition-bg block h-0.5 max-w-0 bg-white duration-500 group-hover:max-w-full"
			></span>
		</a>
	</nav>

	<Button
		click={() => {
			sidebarOpen = !sidebarOpen;
		}}
    additionalStyle="text-background"
	>
		<span class="material-symbols-outlined">person</span>
    <span>Sign in</span>
	</Button>
</header>

<Sidebar open={sidebarOpen} />
