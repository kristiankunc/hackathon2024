<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		style = null,
		additionalStyle = '',
		click = () => {},
		type = 'submit',
		children
	}: {
		style?: string | null;
		additionalStyle?: string;
		click?: Function;
		type?: 'submit' | 'button' | 'reset' | null | undefined;
		children: Snippet;
	} = $props();
</script>

<button
	{type}
	onclick={() => click()}
	class={style != null
		? style
		: 'text-primary hover:bg-primary-800 hover:text-primary-200 flex items-center justify-center gap-2 rounded-lg border px-2 py-1 transition-colors'}
>
	{#if additionalStyle}
		<div class="flex items-center justify-center gap-2 {additionalStyle}">
			{@render children?.()}
		</div>
	{:else}
		{@render children?.()}
	{/if}
</button>
