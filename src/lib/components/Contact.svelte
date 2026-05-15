<script lang="ts">
	import { onMount } from 'svelte';
	import { personal } from '$lib/data';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let status = $state<'idle' | 'sending' | 'sent' | 'error'>('idle');
	let errors = $state({ name: '', email: '', message: '' });
	let section: HTMLElement;
	let visible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			([e]) => { if (e.isIntersecting) { visible = true; observer.disconnect(); } },
			{ threshold: 0.1 }
		);
		observer.observe(section);
		return () => observer.disconnect();
	});

	function validate() {
		const e = { name: '', email: '', message: '' };
		if (!name.trim()) e.name = 'Required';
		if (!email.trim()) e.email = 'Required';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email';
		if (!message.trim()) e.message = 'Required';
		else if (message.trim().length < 10) e.message = 'Too short';
		errors = e;
		return !e.name && !e.email && !e.message;
	}

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		if (!validate()) return;
		status = 'sending';
		try {
			const res = await fetch(`https://formspree.io/f/${personal.formspreeId}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
				body: JSON.stringify({ name, email, message })
			});
			status = res.ok ? 'sent' : 'error';
		} catch {
			status = 'error';
		}
		if (status === 'sent') { name = ''; email = ''; message = ''; }
	}
</script>

<section id="contact" class="section" bind:this={section} aria-label="Contact">
	<div class="container">
		<div class="contact-header">
			<span class="section-num" aria-hidden="true">05</span>
			<div class="reveal-line" class:in={visible}>
				<h2>Let's Talk</h2>
			</div>
		</div>

		<div class="contact-grid">
			<div class="contact-left">
				<p class="reveal-line" class:in={visible} style="transition-delay:0.1s">
					<span>
						Open to new opportunities, collaborations, and interesting conversations.
						Drop me a line.
					</span>
				</p>
				<div class="contact-links reveal-line" class:in={visible} style="transition-delay:0.18s">
					<span>
						<a href={`mailto:${personal.email}`} class="clink">
							<span class="clink-label">Email</span>
							<span class="clink-val">{personal.email} ↗</span>
						</a>
						<a href={personal.github} target="_blank" rel="noopener noreferrer" class="clink">
							<span class="clink-label">GitHub</span>
							<span class="clink-val">github.com ↗</span>
						</a>
						<a href={personal.linkedin} target="_blank" rel="noopener noreferrer" class="clink">
							<span class="clink-label">LinkedIn</span>
							<span class="clink-val">linkedin.com ↗</span>
						</a>
					</span>
				</div>
			</div>

			<form onsubmit={submit} novalidate aria-label="Contact form" class:visible>
				<div class="field" class:has-error={!!errors.name}>
					<label for="name">Name</label>
					<input id="name" type="text" bind:value={name} placeholder="Your name" autocomplete="name" aria-invalid={!!errors.name} />
					{#if errors.name}<span class="err" role="alert">{errors.name}</span>{/if}
				</div>
				<div class="field" class:has-error={!!errors.email}>
					<label for="email">Email</label>
					<input id="email" type="email" bind:value={email} placeholder="your@email.com" autocomplete="email" aria-invalid={!!errors.email} />
					{#if errors.email}<span class="err" role="alert">{errors.email}</span>{/if}
				</div>
				<div class="field" class:has-error={!!errors.message}>
					<label for="message">Message</label>
					<textarea id="message" bind:value={message} placeholder="Tell me about your project..." rows="5" aria-invalid={!!errors.message}></textarea>
					{#if errors.message}<span class="err" role="alert">{errors.message}</span>{/if}
				</div>
				<button type="submit" class="btn-send" disabled={status === 'sending' || status === 'sent'} aria-live="polite">
					{#if status === 'sending'}
						<span class="spinner" aria-hidden="true"></span> Sending…
					{:else if status === 'sent'}
						✓ Sent
					{:else if status === 'error'}
						✗ Failed — try emailing directly
					{:else}
						Send Message →
					{/if}
				</button>
			</form>
		</div>
	</div>
</section>

<style>
.contact-header {
	display: flex;
	align-items: flex-start;
	gap: 2rem;
	margin-bottom: 5rem;
	border-top: 1px solid var(--border);
	padding-top: 2rem;
}
.section-num {
	font-family: var(--font-mono);
	font-size: 0.7rem;
	color: var(--muted);
	padding-top: 0.6rem;
	letter-spacing: 0.1em;
}

.contact-grid {
	display: grid;
	grid-template-columns: 1fr 1.2fr;
	gap: 6rem;
	align-items: start;
}

.contact-left p {
	font-size: 1.1rem;
	color: var(--muted);
	line-height: 1.7;
	margin-bottom: 3rem;
	max-width: 360px;
}

.contact-links > span { display: flex; flex-direction: column; gap: 0; }
.clink {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 0;
	border-top: 1px solid var(--border);
	transition: border-color 0.2s;
}
.clink:last-child { border-bottom: 1px solid var(--border); }
.clink:hover { border-color: var(--accent); }
.clink-label { font-size: 0.78rem; color: var(--muted); font-family: var(--font-mono); letter-spacing: 0.08em; }
.clink-val { font-size: 0.88rem; color: var(--text); font-weight: 500; transition: color 0.2s; }
.clink:hover .clink-val { color: var(--accent); }

form {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	opacity: 0;
	transform: translateY(20px);
	transition: opacity 0.7s var(--ease) 0.2s, transform 0.7s var(--ease) 0.2s;
}
form.visible { opacity: 1; transform: translateY(0); }

.field { display: flex; flex-direction: column; gap: 0.5rem; }
label { font-size: 0.75rem; font-weight: 600; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; font-family: var(--font-mono); }
input, textarea {
	background: var(--surface);
	border: 1px solid var(--border);
	border-radius: var(--radius);
	padding: 0.85rem 1rem;
	color: var(--text);
	font-size: 0.95rem;
	font-family: inherit;
	transition: border-color 0.2s;
	resize: vertical;
}
input:focus, textarea:focus { border-color: var(--accent); outline: none; }
.has-error input, .has-error textarea { border-color: #ff6b6b; }
.err { font-size: 0.75rem; color: #ff6b6b; font-family: var(--font-mono); }

.btn-send {
	padding: 0.9rem 2rem;
	background: var(--accent);
	color: #000;
	border: none;
	border-radius: 100px;
	font-size: 0.9rem;
	font-weight: 700;
	cursor: pointer;
	transition: opacity 0.2s, transform 0.2s, box-shadow 0.3s;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	align-self: flex-start;
	letter-spacing: -0.01em;
}
.btn-send:hover:not(:disabled) {
	opacity: 0.9;
	transform: translateY(-2px);
	box-shadow: 0 8px 30px rgba(232,255,0,0.25);
}
.btn-send:disabled { opacity: 0.5; cursor: not-allowed; }

.spinner {
	width: 14px; height: 14px;
	border: 2px solid rgba(0,0,0,0.2);
	border-top-color: #000;
	border-radius: 50%;
	animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 768px) {
	.contact-grid { grid-template-columns: 1fr; gap: 3rem; }
}
</style>
