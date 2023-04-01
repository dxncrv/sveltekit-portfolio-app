<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { disciplines, handler } from '../store';
	import Nav from '../components/Nav.svelte';
</script>

<svelte:head>
	<title>My App</title>
</svelte:head>

<header>
	<Nav />
	<div class="btn-wrapper">
		{#each Object.entries($disciplines) as [key, b]}
			<button class:selected={b} on:click={handler.toggle(key, b)}>
				{key}
			</button>
		{/each}
	</div>
</header>

<main class:home={$page.route.id === '/'}>
	<slot />
</main>

<footer>
	<p>handmade with ♥ by @dxncrv</p>
</footer>
