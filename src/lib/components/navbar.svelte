<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import Sidebar from './sidebar.svelte';
	import Button from './ui/button.svelte';
	import { page } from '$app/stores';

	let { sidebarOpen = $bindable(false) }: { sidebarOpen: boolean } = $props();
	let transparentPaths = ['/landing'];
</script>

<header
	class={`fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between ${transparentPaths.includes($page.url.pathname) ? 'bg-transparent' : 'bg-primary'} px-4 py-4 text-background shadow-md`}
>
	<div class="flex items-center gap-4">
		<Button
			click={() => {
				sidebarOpen = !sidebarOpen;
			}}
			preset="borderless"
			colorScheme="background"
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

	<div class="flex flex-row items-center justify-center">
		{#if $page.data.user}
			<span class="material-symbols-outlined mr-1">person</span>
			<span class="mr-4 text-sm font-semibold">{$page.data.user.name}</span>
			<Button click={() => signOut()} preset="skeleton" colorScheme="background">
				<span>Sign out</span>
			</Button>
		{:else}
			<Button click={() => signIn('google')} preset="borderless" colorScheme="background">
				<span class="material-symbols-outlined">person</span>
				<span>Sign in</span>
			</Button>
		{/if}
	</div>
</header>
<div class="h-16"></div>

<Sidebar open={sidebarOpen} />
