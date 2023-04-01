<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	onMount(() => {
		const dot = document.querySelector('.dot');
		const active = document.querySelector('.active');

		dot.style.translate = `calc(${active.offsetLeft + active.offsetWidth / 2}px + -50%) 150%`;
		dot.style.opacity = 1;

		function moveDot() {
			dot.style.translate = `calc(${this.offsetLeft + this.offsetWidth / 2}px + -50%) 150%`;
		}

		const links = document.querySelectorAll('nav a');
		links.forEach((i) => {
			i.addEventListener('click', moveDot);
		});
	});
</script>

<div class="dot" />

<style>
	.dot {
		position: absolute;
		bottom: 0;
		width: 0.5rem;
		height: 0.25rem;
		translate: -50% 150%;
		border-radius: 50%;
		background: var(--font);
		opacity: 0;
		transition: 0.5s ease-in-out;
	}
</style>
