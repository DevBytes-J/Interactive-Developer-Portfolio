<script lang="ts">
	import { personal } from '$lib/data';
</script>

<footer aria-label="Footer">
	<div class="container">
		<div class="footer-inner">
			<p class="footer-name">{personal.name}<span class="dot" aria-hidden="true">.</span></p>
			<p class="footer-copy">&copy; {new Date().getFullYear()} — Built with Svelte</p>
			<div class="footer-links">
				<a href={personal.github} target="_blank" rel="noopener noreferrer">GitHub</a>
				<a href={personal.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
				<a href={personal.twitter} target="_blank" rel="noopener noreferrer">Twitter/X</a>
				<a href={`mailto:${personal.email}`}>Email</a>
			</div>
		</div>
	</div>
</footer>

<style>
footer {
	border-top: 1px solid var(--border);
	padding: 2.5rem 0;
}
.footer-inner {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 2rem;
	flex-wrap: wrap;
}
.footer-name {
	font-weight: 800;
	font-size: 1rem;
	letter-spacing: -0.04em;
}
.dot { color: var(--accent); }
.footer-copy {
	font-size: 0.78rem;
	color: var(--muted);
	font-family: var(--font-mono);
}
.footer-links {
	display: flex;
	gap: 2rem;
}
.footer-links a {
	font-size: 0.82rem;
	color: var(--muted);
	transition: color 0.2s;
	font-weight: 500;
}
.footer-links a:hover { color: var(--accent); }

@media (max-width: 768px) {
	.footer-inner { flex-direction: column; align-items: flex-start; gap: 1rem; }
}
</style>
