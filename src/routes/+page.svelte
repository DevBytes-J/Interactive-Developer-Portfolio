<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		const sections = document.querySelectorAll('.section');
		const obs = new IntersectionObserver(
			(entries) => {
				entries.forEach(e => {
					if (e.isIntersecting) e.target.classList.add('section-visible');
				});
			},
			{ threshold: 0.05 }
		);
		sections.forEach(s => obs.observe(s));
		return () => obs.disconnect();
	});
</script>

<a href="#main" class="skip-link">Skip to content</a>
<Nav />
<main id="main">
	<Hero />
	<About />
	<Projects />
	<Terminal />
	<Contact />
</main>
<Footer />

<style>
:global(.section) {
	opacity: 0;
	transform: translateY(32px);
	transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
}
:global(.section.section-visible) {
	opacity: 1;
	transform: translateY(0);
}
</style>
