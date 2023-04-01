<script lang="ts">
	import { page } from '$app/stores';
	import Dot from './Dot.svelte';

	type navbar = {
		[key: string]: string;
	};
	export const navbar = {
		Home: '/',
		About: '/about',
		Portfolio: '/portfolio',
		Contact: '/contact'
	};
</script>

<nav>
	<ul>
		{#each Object.entries(navbar) as [title, path]}
			<li>
				<a class:active={$page.route.id === path} href={path}>{title}</a>
			</li>
		{/each}
		<Dot />
	</ul>
</nav>

<style>
	nav {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 2.5rem;
	}
	ul {
		position: relative;
		padding: 0;
		display: flex;
		gap: 2rem;
		list-style: none;
	}
	a {
		font-size: 1rem;
		font-family: 'Averia Sans Libre', cursive;
		color: var(--font-dim);
		text-decoration: none;
		border-bottom: transparent;
		transition: 0.25s ease-in-out;
	}
	a:hover,
	.active {
		color: var(--font);
	}
	a:focus {
		color: var(--accent);
	}
</style>
