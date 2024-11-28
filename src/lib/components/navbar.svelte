<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import Sidebar from './sidebar.svelte';
	import Button from './ui/button.svelte';
	import { page } from '$app/stores';

	let { sidebarOpen = $bindable(false) }: { sidebarOpen: boolean } = $props();
</script>

<header
	class="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between bg-background-950 px-4 py-4 shadow"
>
	<nav class="flex items-center gap-12">
		<Button
			click={() => {
				sidebarOpen = !sidebarOpen;
			}}
			preset="borderless"
			colorScheme="text"
		>
			<span class="material-symbols-outlined">menu</span>
		</Button>
		<a class="text-lg font-bold" href="/">LOGO</a>

		<a href="/about" class="group">
			About
			<span class="block h-0.5 max-w-0 bg-text duration-300 group-hover:max-w-full"></span>
		</a>
		<a href="/services" class="group">
			Services
			<span class="block h-0.5 max-w-0 bg-text duration-300 group-hover:max-w-full"></span>
		</a>
		<a href="/contact" class="group">
			Contact
			<span class="block h-0.5 max-w-0 bg-text duration-300 group-hover:max-w-full"></span>
		</a>
	</nav>

	<div class="flex flex-row items-center justify-center">
		{#if $page.data.user}
			<span class="material-symbols-outlined mr-1">person</span>
			<span class="mr-4 text-sm font-semibold">{$page.data.user.name}</span>
			<Button click={() => signOut()} colorScheme="secondary">
				<span>Sign out</span>
			</Button>
		{:else}
			<Button click={() => signIn('google')} preset="borderless" colorScheme="text">
				<span class="material-symbols-outlined">person</span>
				<span>Sign in</span>
			</Button>
		{/if}
	</div>
</header>
<div class="h-16"></div>

<Sidebar bind:open={sidebarOpen} />
