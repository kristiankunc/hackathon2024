<script lang="ts">
	// Skript není potřeba, pokud nejsou nutné další interakce
</script>

<main>
	<h1>Create New Employee</h1>
	<form method="POST" action="?/createEmployee">
		<div>
			<label for="firstName">First Name:</label>
			<input name="firstName" type="text" required />
		</div>
		<div>
			<label for="lastName">Last Name:</label>
			<input name="lastName" type="text" required />
		</div>
		<div>
			<label for="email">Email:</label>
			<input name="email" type="email" required />
		</div>
		<div>
			<label for="employeeCategoryId">Category ID:</label>
			<input name="employeeCategoryId" type="number" min="1" required />
		</div>
		<div>
			<button type="submit">Create</button>
		</div>
	</form>
</main>
