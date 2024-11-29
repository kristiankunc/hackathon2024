<script lang="ts">
	let { log } = $props();

	import Button from '../ui/button.svelte';

</script>

<div class="mb-2 flex w-full items-center justify-between rounded-lg bg-background p-4">
	<div class="flex items-center gap-2">
    <span class="material-symbols-outlined">person</span>
		<h3 class="font-semibold">{log.employee.firstName} {log.employee.lastName}</h3>
		<h4 class="text-xs">{log.employee.email}</h4>
	</div>
	<div class="flex items-center gap-8">
		{#if log.latestLog.action == 'READ'}
			<span class="material-symbols-outlined text-[#51c6aa]">check</span>
		{:else if log.latestLog.action == 'CLICKED'}
			<span class="material-symbols-outlined text-[#cf7d6d]">warning</span>
		{:else}
			<span class="material-symbols-outlined text-primary">visibility_off</span>
		{/if}
		<Button preset="borderless" colorScheme="text">
      <span class="material-symbols-outlined">more_vert</span>
		</Button>
	</div>
</div>
