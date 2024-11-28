<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	let {
		additionalStyle = '',
		click = () => {},
		type = 'submit',
		preset = 'fill',
		colorScheme = 'primary',
		href = null,
		disableDefaults = false,
		children
	}: {
		additionalStyle?: string;
		click?: Function;
		type?: 'submit' | 'button' | 'reset' | null | undefined;
		preset?: 'skeleton' | 'fill' | 'borderless';
		colorScheme?: 'primary' | 'secondary' | 'accent' | 'background';
		href?: string | null;
		disableDefaults?: boolean;
		children: Snippet;
	} = $props();

	const colorSchemes = {
		primary: {
			c1: 'primary',
			c2: 'background',
			c3: 'primary-900',
			c4: 'primary-900'
		},
		secondary: {
			c1: 'secondary',
			c2: 'background',
			c3: 'secondary-900',
			c4: 'secondary-900'
		},
		accent: {
			c1: 'accent',
			c2: 'background',
			c3: 'accent-900',
			c4: 'accent-900'
		},
		background: {
			c1: 'background',
			c2: 'primary',
			c3: 'background-900',
			c4: 'background-600'
		}
	};

	let presets = {
		skeleton:
			'border border-' +
			colorSchemes[colorScheme].c1 +
			' text-' +
			colorSchemes[colorScheme].c1 +
			' hover:bg-' +
			colorSchemes[colorScheme].c4,
		fill:
			'border border-' +
			colorSchemes[colorScheme].c1 +
			' bg-' +
			colorSchemes[colorScheme].c1 +
			' text-' +
			colorSchemes[colorScheme].c2 +
			' hover:bg-' +
			colorSchemes[colorScheme].c2 +
			' hover:text-' +
			colorSchemes[colorScheme].c1,
		borderless: 'text-' + colorSchemes[colorScheme].c1 + ' hover:bg-' + colorSchemes[colorScheme].c4
	};
</script>

{#if href}
	<a {href}>
		<button
			{type}
			onclick={() => click()}
			class="{disableDefaults
				? ''
				: 'flex items-center justify-center gap-2 rounded-lg p-2 transition-colors'} {presets[
				preset
			]} {additionalStyle}"
		>
			{@render children?.()}
		</button>
	</a>
{:else}
	<button
		{type}
		onclick={() => click()}
		class="{disableDefaults
			? ''
			: 'flex items-center justify-center gap-2 rounded-lg p-2 transition-colors'} {presets[
			preset
		]} {additionalStyle}"
	>
		{@render children?.()}
	</button>
{/if}

<!-- DONT DELETE THESE DIVs - it makes tailwind include required classes -->
<div class="hidden border-accent bg-accent text-accent hover:bg-accent hover:text-accent"></div>
<div
	class="hidden border-secondary bg-secondary text-secondary hover:bg-secondary hover:text-secondary"
></div>
<div
	class="hidden border-primary bg-primary text-primary hover:bg-primary hover:text-primary"
></div>
<div
	class="hidden border-background bg-background text-background hover:bg-background hover:text-background"
></div>
<div class="hidden hover:bg-primary-900"></div>
<div class="hidden hover:bg-secondary-900"></div>
<div class="hidden hover:bg-accent-900"></div>
<div class="hidden hover:bg-background-900"></div>
<!-- <div class="hidden hover:bg-primary-700"></div> -->
<!-- <div class="hidden hover:bg-secondary-700"></div> -->
<!-- <div class="hidden hover:bg-accent-700"></div> -->
<div class="hidden hover:bg-background-600"></div>
