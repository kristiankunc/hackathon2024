<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index.js';
	import { signIn, signOut } from '@auth/sveltekit/client';
</script>

<header class="flex items-center justify-between bg-primary px-4 py-4 text-background shadow-md">
	<div class="text-lg font-bold">
		<a href="/">LOGO</a>
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
	{#if $page.data.user}
		<div class="flex items-center gap-4">
			<span>{$page.data.user.name}</span>
			<Button
				class="rounded-lg border border-white bg-white px-4 py-2 font-bold text-text hover:border hover:bg-primary hover:text-white"
				onclick={() => signOut()}
			>
				Sign Out
			</Button>
		</div>
	{:else}
		<Button
			class="rounded-lg border border-white bg-white px-4 py-2 font-bold text-text hover:border hover:bg-primary hover:text-white"
			onclick={() => signIn('google')}
		>
			Sign In
		</Button>
	{/if}
</header>
