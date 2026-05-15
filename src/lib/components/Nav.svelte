<script lang="ts">
	import { theme } from '$lib/stores';
	import { personal } from '$lib/data';

	let scrolled = $state(false);
	let menuOpen = $state(false);

	const links = [
		{ href: '#about', label: 'About' },
		{ href: '#projects', label: 'Projects' },
		{ href: '#terminal', label: 'Terminal' },
		{ href: '#contact', label: 'Contact' }
	];

	$effect(() => {
		const handler = () => { scrolled = window.scrollY > 60; };
		window.addEventListener('scroll', handler, { passive: true });
		return () => window.removeEventListener('scroll', handler);
	});
</script>

<header class:scrolled>
	<nav class="container" aria-label="Main navigation">
		<a href="#hero" class="logo" aria-label="Home">{personal.name.split(' ')[0]}<span class="logo-dot" aria-hidden="true">.</span></a>

		<ul class="nav-links" class:open={menuOpen} role="list">
			{#each links as { href, label }}
				<li><a {href} onclick={() => (menuOpen = false)}>{label}</a></li>
			{/each}
		</ul>

		<div class="nav-right">
			<button
				class="theme-toggle"
				onclick={() => theme.update(t => t === 'dark' ? 'light' : 'dark')}
				aria-label="Toggle theme"
			>
				{#if $theme === 'dark'}☀{:else}☾{/if}
			</button>
			<a href={personal.resume} class="btn-nav" download>Resume</a>
			<button class="menu-toggle" onclick={() => (menuOpen = !menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">
				<span class:open={menuOpen}></span>
			</button>
		</div>
	</nav>
</header>

<style>
header {
	position: fixed;
	top: 0; left: 0; right: 0;
	z-index: 100;
	padding: 1.75rem 0;
	transition: padding 0.3s var(--ease), background 0.3s, border-color 0.3s;
	border-bottom: 1px solid transparent;
}
header.scrolled {
	padding: 1rem 0;
	background: rgba(10,10,10,0.8);
	backdrop-filter: blur(24px);
	-webkit-backdrop-filter: blur(24px);
	border-bottom-color: var(--border);
}
:global([data-theme="light"]) header.scrolled {
	background: rgba(250,250,250,0.9);
}

nav { display: flex; align-items: center; justify-content: space-between; }

.logo {
	font-size: 1.1rem;
	font-weight: 800;
	letter-spacing: -0.04em;
	color: var(--text);
}
.logo-dot { color: var(--accent); }

.nav-links {
	display: flex;
	align-items: center;
	gap: 3rem;
	list-style: none;
}
.nav-links a {
	font-size: 0.82rem;
	color: var(--muted);
	font-weight: 500;
	letter-spacing: 0.02em;
	transition: color 0.2s;
}
.nav-links a:hover { color: var(--text); }

.nav-right { display: flex; align-items: center; gap: 1rem; }

.theme-toggle {
	background: none;
	border: none;
	cursor: pointer;
	color: var(--muted);
	font-size: 1rem;
	padding: 0.25rem;
	transition: color 0.2s;
	line-height: 1;
}
.theme-toggle:hover { color: var(--text); }

.btn-nav {
	padding: 0.45rem 1.1rem;
	border: 1px solid var(--border);
	border-radius: 100px;
	font-size: 0.8rem;
	font-weight: 600;
	color: var(--text);
	transition: border-color 0.2s, background 0.2s;
	letter-spacing: -0.01em;
}
.btn-nav:hover { border-color: var(--accent); background: rgba(232,255,0,0.05); }

.menu-toggle {
	display: none;
	background: none;
	border: none;
	cursor: pointer;
	padding: 0.4rem;
	flex-direction: column;
	gap: 5px;
}
.menu-toggle span,
.menu-toggle span::before,
.menu-toggle span::after {
	display: block;
	width: 20px; height: 1.5px;
	background: var(--text);
	border-radius: 2px;
	transition: transform 0.3s, opacity 0.3s;
	position: relative;
}
.menu-toggle span::before, .menu-toggle span::after { content: ''; position: absolute; }
.menu-toggle span::before { top: -6px; }
.menu-toggle span::after { top: 6px; }
.menu-toggle span.open { background: transparent; }
.menu-toggle span.open::before { transform: rotate(45deg) translate(4px, 4px); }
.menu-toggle span.open::after { transform: rotate(-45deg) translate(4px, -4px); }

@media (max-width: 768px) {
	.menu-toggle { display: flex; }
	.nav-links {
		position: fixed;
		inset: 0;
		background: var(--bg);
		flex-direction: column;
		justify-content: center;
		gap: 3rem;
		transform: translateX(100%);
		transition: transform 0.4s var(--ease);
		pointer-events: none;
	}
	.nav-links.open { transform: translateX(0); pointer-events: all; }
	.nav-links a { font-size: 1.5rem; }
}
</style>
