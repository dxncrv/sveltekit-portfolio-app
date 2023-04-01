<script lang="ts">
	import { fade } from 'svelte/transition';
	import { current } from '../routes/portfolio/projects';
	import { selected } from '../store';

	let content: any = [];
	$: content = current.fetchContent($current, $selected);
</script>

<div class="reader" in:fade>
	<div>
		{#each content as o, i}
			<p>{o.description}</p>
		{/each}
	</div>
</div>

<style>
	.reader {
		display: flex;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		background: var(--bg-dim);
		border-radius: 0 0 2rem 2rem;
		transition: all 0.3s ease-in-out;
	}
	.reader video {
		position: absolute;
		height: 100%;
		object-fit: contain;
	}
	.reader div {
		width: 100%;
		position: relative;
	}
	.reader p {
		font-family: 'Hanken Grotesk', sans-serif;
		line-height: 1.5;
		color: var(--font);
		font-size: medium;
		opacity: 0.8;
	}
</style>
