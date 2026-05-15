<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { theme, reducedMotion } from '$lib/stores';

	let { children } = $props();

	onMount(() => {
		const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
		if (saved) theme.set(saved);

		reducedMotion.set(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

		const unsub = theme.subscribe((t) => {
			document.documentElement.setAttribute('data-theme', t);
			localStorage.setItem('theme', t);
		});
		return unsub;
	});
</script>

<svelte:head>
	<title>Joanna Bassey — Frontend Engineer</title>
	<meta name="description" content="Interactive developer portfolio showcasing frontend engineering, animations, and creative web experiences." />
</svelte:head>

{@render children()}
