<script lang="ts">
	import { onMount } from 'svelte';
	import { personal } from '$lib/data';

	let section: HTMLElement;
	let visible = $state(false);

	const stats = [
		{ value: '2+', label: 'Years experience' },
		{ value: '40+', label: 'Projects shipped' },
		{ value: '12+', label: 'Open source repos' },
		{ value: '99', label: 'Lighthouse score' },
	];

	const stack = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Svelte', 'JavaScript', 'UI/UX'];

	onMount(() => {
		const observer = new IntersectionObserver(
			([e]) => { if (e.isIntersecting) { visible = true; observer.disconnect(); } },
			{ threshold: 0.1 }
		);
		observer.observe(section);
		return () => observer.disconnect();
	});
</script>

<section id="about" class="section" bind:this={section} aria-label="About me">
	<div class="container">
		<div class="about-header">
			<span class="section-num" aria-hidden="true">02</span>
			<div class="about-title reveal-line" class:in={visible}>
				<h2>About</h2>
			</div>
		</div>

		<div class="about-body" class:visible>
			<div class="about-left">
				<div class="profile-wrap reveal-line" class:in={visible} style="transition-delay:0.05s">
					<span>
						<img src="/profile.png" alt="Joanna Bassey" class="profile-img" width="400" height="400" />
						<div class="profile-accent" aria-hidden="true"></div>
					</span>
				</div>
			</div>

			<div class="about-text">
				<p class="reveal-line" class:in={visible} style="transition-delay:0.1s">
					<span>
						I'm a passionate frontend developer dedicated to crafting exceptional digital experiences
						that blend aesthetics with functionality. With 2+ years of experience, I specialize in
						building responsive, user-focused interfaces that perform flawlessly.
					</span>
				</p>
				<p class="reveal-line" class:in={visible} style="transition-delay:0.18s">
					<span>
						My approach combines modern design principles with cutting-edge technologies to deliver
						solutions that exceed expectations — clean code, smooth animations, and intuitive UX.
					</span>
				</p>
				<div class="stack reveal-line" class:in={visible} style="transition-delay:0.26s" aria-label="Tech stack">
					<span>
						{#each stack as item}
							<span class="stack-item">{item}</span>
						{/each}
					</span>
				</div>
				<div class="reveal-line" class:in={visible} style="transition-delay:0.34s">
					<span>
						<a href={personal.resume} class="btn-resume" download>Download Resume ↓</a>
					</span>
				</div>

				<div class="stats" aria-label="Stats">
					{#each stats as stat, i}
						<div class="stat reveal-line" class:in={visible} style="transition-delay:{0.42 + i * 0.08}s">
							<span>
								<span class="stat-value">{stat.value}</span>
								<span class="stat-label">{stat.label}</span>
							</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
.about-header {
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

.about-body {
	display: grid;
	grid-template-columns: 1fr 1.4fr;
	gap: 5rem;
	align-items: start;
}

.about-left { position: sticky; top: 6rem; }

.profile-wrap {
	position: relative;
	display: inline-block;
	width: 100%;
}
.profile-wrap > span { display: block; position: relative; }

.profile-img {
	width: 100%;
	max-width: 360px;
	aspect-ratio: 1;
	object-fit: cover;
	border-radius: calc(var(--radius) * 2);
	display: block;
	filter: grayscale(20%);
	transition: filter 0.4s;
}
.profile-img:hover { filter: grayscale(0%); }

.profile-accent {
	position: absolute;
	inset: 12px -12px -12px 12px;
	border: 1px solid var(--accent);
	border-radius: calc(var(--radius) * 2);
	z-index: -1;
	opacity: 0.4;
	pointer-events: none;
}

.about-text p {
	color: var(--muted);
	line-height: 1.8;
	margin-bottom: 1.5rem;
	font-size: 1.05rem;
}

.stack span {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-bottom: 2rem;
}
.stack-item {
	font-family: var(--font-mono);
	font-size: 0.72rem;
	padding: 0.3rem 0.75rem;
	border: 1px solid var(--border);
	border-radius: 100px;
	color: var(--muted);
	letter-spacing: 0.05em;
	transition: border-color 0.2s, color 0.2s;
}
.stack-item:hover { border-color: var(--accent); color: var(--text); }

.btn-resume {
	display: inline-block;
	font-size: 0.88rem;
	font-weight: 600;
	color: var(--text);
	border-bottom: 1px solid var(--border);
	padding-bottom: 2px;
	transition: border-color 0.2s;
	letter-spacing: -0.01em;
}
.btn-resume:hover { border-color: var(--accent); }

.stats {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 0;
	border: 1px solid var(--border);
	border-radius: var(--radius);
	overflow: hidden;
	margin-top: 2.5rem;
}
.stat {
	padding: 1.5rem;
	border-right: 1px solid var(--border);
	border-bottom: 1px solid var(--border);
	transition: background 0.2s;
}
.stat:nth-child(even) { border-right: none; }
.stat:nth-last-child(-n+2) { border-bottom: none; }
.stat:hover { background: var(--surface); }
.stat > span { display: flex; flex-direction: column; gap: 0.3rem; }
.stat-value {
	font-size: clamp(1.6rem, 3vw, 2.2rem);
	font-weight: 800;
	letter-spacing: -0.04em;
	color: var(--accent);
	line-height: 1;
}
.stat-label {
	font-size: 0.75rem;
	color: var(--muted);
	font-weight: 400;
}

@media (max-width: 900px) {
	.about-body { grid-template-columns: 1fr; gap: 3rem; }
	.about-left { position: static; }
	.profile-img { max-width: 240px; }
}
</style>
