<script lang="ts">
	import { fade } from 'svelte/transition';
	import { selected } from '../../store';
	import { range, current, projects } from './projects';
	import Reader from '../../components/Reader.svelte';
	import { onMount } from 'svelte';

	const events: any = {
		Escape: () => current.close(),
		ArrowLeft: () => {
			if ($range.min > 0) range.prev();
		},
		ArrowRight: () => {
			if ($range.max < $projects.length) range.next();
		}
	};

	function handleEvents(e: KeyboardEvent) {
		if (e.key in events) {
			e.preventDefault();
			events[e.key]();
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleEvents);
		console.log('mounted');
		return () => {
			window.removeEventListener('keydown', handleEvents);
			console.log('unmounted');
		};
	});

	$: projects.getProjects($selected), range.reset();
</script>

<header class="work">
	{#if $current === null}
		<p />
		<p>
			Showing <span>{$projects.length}</span> projects {#if $selected.length !== 0} in {/if}
			<span>{$selected.join(', ').replace(/,(?!.*,)/gim, ' and')}</span>
		</p>
		<p />
	{:else}
		<div class="btn-wrapper">
			<button on:click={current.close}> Back </button>
		</div>
		<div class="btn-wrapper">
			<p>{$current.title}</p>
		</div>
		<p />
	{/if}
</header>

{#if $current === null}
	<div class="grid">
		{#each $projects.slice($range.min, $range.max) as { cover, title, description, id }, i (id)}
			<div
				class="card"
				on:click={() => current.setCurrent(id, $projects)}
				on:keypress={(e) => e.key === 'Enter' && current.setCurrent(id, $projects)}
				in:fade={{ delay: i * 150 }}
			>
				<img src={cover} alt="img" />
				<h2>{title}</h2>
				<p>{description}</p>
			</div>
		{/each}
	</div>
	<footer class="work">
		{#if $projects.length !== 0}
			<p>
				{#if $range.min === 0}1{:else}{$range.min / 3 + 1}{/if} / {Math.ceil($projects.length / 3)}
			</p>
			<div class="btn-wrapper">
				<button on:click={range.prev} disabled={$range.min <= 0}>Prev</button>
				<button on:click={range.next} disabled={$range.max >= $projects.length}>Next</button>
			</div>
		{/if}
	</footer>
{:else}
	<Reader />
{/if}

<style>
	header.work {
		justify-content: space-between;
	}
	footer.work {
		position: absolute;
		bottom: 0;
		margin: 2rem;
		flex-direction: column;
		gap: 1rem;
	}
	.grid {
		padding: 3rem;
		display: grid;
		grid-template-columns: repeat(3, minmax(20rem, 1fr));
		grid-gap: 3rem;
		transition: all 0.3s ease-in-out;
	}
	.card {
		padding: 1rem;
		min-height: 10rem;
		border: 1px solid var(--font-dim);
		background: var(--bg-dim);
		border-radius: 1rem;
		transition: all 0.3s ease-in-out;
		box-shadow: 0 1.5rem 3rem -12px rgb(0 0 0 / 0.5);
	}
	.card:hover {
		cursor: pointer;
		transform: translateY(-0.5rem);
		box-shadow: 0 1.5rem 3rem -12px rgb(0 0 0 / 0.1);
	}
	.card p {
		font-family: 'Hanken Grotesk', sans-serif;
		line-height: 1.5;
		color: var(--font);
		font-size: medium;
		opacity: 0.8;
	}
	img {
		width: 100%;
		height: 10rem;
		object-fit: cover;
		border-radius: 0.5rem;
	}
	h2 {
		padding: 1rem 0;
		font-family: 'Averia Sans Libre', cursive;
		color: var(--font);
	}
	span {
		color: var(--accent);
	}
</style>
