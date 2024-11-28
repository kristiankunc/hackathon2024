<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
</script>

<form method="POST" action="?/importFle" enctype="multipart/form-data">
	<p>File</p>
	<input accept=".csv" type="file" name="file" required />
	<Button type="submit">Submit</Button>
</form>
