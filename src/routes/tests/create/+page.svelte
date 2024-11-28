<script lang="ts">
	import { invalidate } from '$app/navigation';

	let name = '';
	let error: string | null = null;

	// Funkce pro odeslání formuláře
	const createTest = async (event: Event) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append('name', name);

		const response = await fetch('/tests/create', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			// Po úspěšném odeslání přesměrujeme na stránku s testy
			invalidate('tests'); // Volání pro znovunačtení stránky
			window.location.href = '/tests'; // Přesměrování na stránku testů
		} else {
			const result = await response.json();
			if (result.missing) {
				error = 'Název testu je povinný.';
			} else if (result.incorrect) {
				error = 'Název testu musí být text.';
			} else {
				error = 'Chyba při vytváření testu.';
			}
		}
	};
</script>

<main>
	<h1>Vytvořit nový test</h1>

	<form on:submit={createTest}>
		<label for="name">Název testu:</label>
		<input id="name" type="text" bind:value={name} required />

		{#if error}
			<div class="error">{error}</div>
		{/if}

		<button type="submit">Vytvořit test</button>
	</form>
</main>
