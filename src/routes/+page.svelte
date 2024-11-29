<script>
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button.svelte';
</script>

<div class="fixed inset-0 -z-20">
	<video autoplay loop muted playsinline class="h-full w-full object-cover">
		<source src="/36784-412873690_tiny.mp4" type="video/mp4" />
		Your browser does not support the video tag.
	</video>
</div>

<div class="fixed bottom-0 left-0 right-0 top-0 -z-10 bg-text opacity-80"></div>
<main class="z-10 my-16">
	<section class="flex flex-col items-center text-center">
		<h1 class="w-1/2 text-5xl font-semibold text-background">
			Employees are the first line of defense against cyber attacks.
		</h1>
		<div class="my-16 w-2/3 rounded-lg bg-background p-8 opacity-75">
			<div class="flex justify-between gap-8">
				<div class="grow">
					<h3 class="mb-4 text-5xl font-bold text-secondary">3.4 bil.</h3>
					<p class="text-md font-semibold">
						spam emails are sent daily with the intent to steal sensitive credentials
					</p>
				</div>
				<div class="w-1 border-r border-secondary"></div>
				<div class="grow">
					<h3 class="mb-4 text-5xl font-bold text-secondary">79%</h3>
					<p class=" text-md font-semibold">
						of UK businesses that suffered a cyber attack in 2023 identified phishing as the cause
					</p>
				</div>
				<div class="w-1 border-r border-secondary"></div>
				<div class="grow">
					<h3 class="mb-4 text-5xl font-bold text-secondary">&gt;40%</h3>
					<p class="text-md font-semibold">
						of cyber attacks in 2021 against businesses in the manufacturing industry involved
						phishing
					</p>
				</div>
			</div>
		</div>
		<div class="mx-auto w-2/3 rounded-lg bg-background bg-opacity-75 p-8">
			<h2 class="mb-8 text-2xl font-semibold">
				Let us help you protect your business with PhishTest.
			</h2>
			<p class="mx-auto w-2/3 text-justify">
				PhishTest is a platform that helps you to train your employees to recognize phishing emails
				and keep themselves and your business safe from cyber attacks.<br /><br />
				Our application lets you generate and send fake phishing emails to your employees, and track
				their responses to see how well they are doing.<br /><br />
				If you feel like your business is at risk based on the statistics our platform provides, you
				can sign up for an in-person course with one of our highly trained professionals, that will help
				you and your employees recognize phishing emails.<br /><br />
				<b>Sign up today and protect your business from cyber attacks.</b>
			</p>
			{#if !$page.data.user}
				<Button href="/auth/signin" additionalStyle="mx-auto mt-16 w-2/3">
					<span>I'm in!</span>
				</Button>
			{:else}
				<Button href="/tests" additionalStyle="mx-auto mt-16 w-2/3">
					<span>Create your first test</span>
				</Button>
			{/if}
		</div>
	</section>
</main>
