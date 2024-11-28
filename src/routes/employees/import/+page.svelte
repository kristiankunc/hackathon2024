<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
</script>

<form method="POST" action="?/importFle" enctype="multipart/form-data">
	<p>File</p>
	<Input accept=".csv" type="file" name="file" required />
	<Button type="submit">Submit</Button>
</form>
