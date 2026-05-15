<script lang="ts">
	import { onMount } from 'svelte';
	import { projects, type Project } from '$lib/data';

	let selectedProject = $state<Project | null>(null);
	let section: HTMLElement;
	let visible = $state(false);

	let order = $state(projects.map((_, i) => i));

	const accents = ['#e8ff00', '#ff6b6b', '#4ecdc4', '#a78bfa', '#fb923c', '#34d399', '#60a5fa', '#f472b6'];

	const row1 = $derived(order.slice(0, 4).map(i => projects[i]));
	const row2 = $derived(order.slice(4, 8).map(i => projects[i]));

	onMount(() => {
		const observer = new IntersectionObserver(
			([e]) => { if (e.isIntersecting) { visible = true; observer.disconnect(); } },
			{ threshold: 0 }
		);
		observer.observe(section);
		return () => observer.disconnect();
	});

	function closeModal(e: MouseEvent | KeyboardEvent) {
		if (e instanceof KeyboardEvent && e.key !== 'Escape') return;
		selectedProject = null;
	}

	let dragging = $state(false);
	let dragFrom = $state<number | null>(null);
	let dragOver = $state<number | null>(null);

	function onDragStart(i: number) {
		dragFrom = i;
		dragging = true;
	}
	function onDragEnter(i: number) {
		dragOver = i;
	}
	function onDrop(i: number) {
		if (dragFrom === null || dragFrom === i) return;
		const next = [...order];
		const [moved] = next.splice(dragFrom, 1);
		next.splice(i, 0, moved);
		order = next;
		dragFrom = null;
		dragOver = null;
		dragging = false;
	}
	function onDragEnd() {
		dragFrom = null;
		dragOver = null;
		dragging = false;
	}
</script>

<svelte:window onkeydown={closeModal} />

<section id="projects" class="section" bind:this={section} aria-label="Projects">
	<div class="container">
		<div class="projects-header">
			<span class="section-num" aria-hidden="true">03</span>
			<div class="reveal-line" class:in={visible}>
				<h2>Work</h2>
			</div>
		</div>
	</div>

	<div class="marquee-wrap">
		<div class="marquee left" class:paused={dragging}>
			{#each [...row1, ...row1] as project, i}
				{@const accent = accents[projects.findIndex(p => p.id === project.id) % accents.length]}
				{@const isFirst = i < 4}
				<div
					class="card"
					class:dragging={isFirst && dragFrom === i}
					class:drag-over={isFirst && dragOver === i && dragFrom !== i}
					style="--accent-card: {accent}"
					draggable={isFirst ? 'true' : 'false'}
					ondragstart={isFirst ? () => onDragStart(i) : undefined}
					ondragenter={isFirst ? () => onDragEnter(i) : undefined}
					ondragover={e => e.preventDefault()}
					ondrop={isFirst ? () => onDrop(i) : undefined}
					ondragend={onDragEnd}
					onclick={() => (selectedProject = project)}
					onkeydown={e => e.key === 'Enter' && (selectedProject = project)}
					tabindex="0"
					role="button"
					aria-label="View {project.title}"
				>
					<div class="card-top">
						<span class="card-category">{project.category}</span>
						{#if project.featured}<span class="card-tag">Featured</span>{/if}
					</div>
					<h3>{project.title}</h3>
					<p>{project.description}</p>
					<div class="card-tech">
						{#each project.tech.slice(0, 3) as t}<span>{t}</span>{/each}
					</div>
					<div class="card-line" aria-hidden="true"></div>
				</div>
			{/each}
		</div>
	</div>

	<div class="marquee-wrap">
		<div class="marquee right" class:paused={dragging}>
			{#each [...row2, ...row2] as project, i}
				{@const accent = accents[projects.findIndex(p => p.id === project.id) % accents.length]}
				{@const isFirst = i < 4}
				<div
					class="card"
					class:dragging={isFirst && dragFrom === i + 4}
					class:drag-over={isFirst && dragOver === i + 4 && dragFrom !== i + 4}
					style="--accent-card: {accent}"
					draggable={isFirst ? 'true' : 'false'}
					ondragstart={isFirst ? () => onDragStart(i + 4) : undefined}
					ondragenter={isFirst ? () => onDragEnter(i + 4) : undefined}
					ondragover={e => e.preventDefault()}
					ondrop={isFirst ? () => onDrop(i + 4) : undefined}
					ondragend={onDragEnd}
					onclick={() => (selectedProject = project)}
					onkeydown={e => e.key === 'Enter' && (selectedProject = project)}
					tabindex="0"
					role="button"
					aria-label="View {project.title}"
				>
					<div class="card-top">
						<span class="card-category">{project.category}</span>
						{#if project.featured}<span class="card-tag">Featured</span>{/if}
					</div>
					<h3>{project.title}</h3>
					<p>{project.description}</p>
					<div class="card-tech">
						{#each project.tech.slice(0, 3) as t}<span>{t}</span>{/each}
					</div>
					<div class="card-line" aria-hidden="true"></div>
				</div>
			{/each}
		</div>
	</div>
</section>

{#if selectedProject}
	{@const accent = accents[projects.findIndex(p => p.id === selectedProject?.id) % accents.length]}
	<div class="modal-backdrop" onclick={closeModal} onkeydown={closeModal} role="presentation">
		<div
			class="modal"
			onclick={e => e.stopPropagation()}
			onkeydown={e => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			aria-label={selectedProject.title}
			tabindex="-1"
			style="--accent-card: {accent}"
		>
			<button class="modal-close" onclick={() => (selectedProject = null)} aria-label="Close">✕</button>
			<div class="modal-accent-bar"></div>
			<div class="modal-body">
				<div class="modal-img-wrap">
					<img src={selectedProject.image} alt={selectedProject.title} class="modal-img" loading="lazy" />
				</div>
				<span class="card-category">{selectedProject.category}</span>
				<h3>{selectedProject.title}</h3>
				<p>{selectedProject.longDescription}</p>
				<div class="modal-tech">
					{#each selectedProject.tech as t}<span>{t}</span>{/each}
				</div>
				<div class="modal-actions">
					<a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" class="btn-primary">Live Demo ↗</a>
					<a href={selectedProject.repo} target="_blank" rel="noopener noreferrer" class="btn-ghost">GitHub ↗</a>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
.projects-header {
	display: flex;
	align-items: flex-start;
	gap: 2rem;
	margin-bottom: 3rem;
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

.marquee-wrap {
	overflow: hidden;
	margin-bottom: 1.5rem;
}
.marquee {
	display: flex;
	gap: 1.5rem;
	width: max-content;
}
.marquee.left  { animation: scrollLeft 30s linear infinite; }
.marquee.right { animation: scrollRight 30s linear infinite; }
.marquee.paused { animation-play-state: paused; }
.marquee-wrap:hover .marquee { animation-play-state: paused; }

@keyframes scrollLeft  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes scrollRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }

.card {
	width: 340px;
	flex-shrink: 0;
	background: var(--surface);
	border: 1px solid var(--border);
	border-radius: calc(var(--radius) * 1.5);
	padding: 1.75rem;
	cursor: grab;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	position: relative;
	overflow: hidden;
	text-align: left;
	transition: border-color 0.3s, box-shadow 0.3s;
}
.card:hover {
	border-color: var(--accent-card);
	box-shadow: 0 20px 50px rgba(0,0,0,0.4);
}
.card.dragging { opacity: 0.35; cursor: grabbing; }
.card.drag-over {
	border-color: var(--accent-card);
	box-shadow: 0 0 0 2px var(--accent-card);
}

.card-line {
	position: absolute;
	top: 0; left: 0; right: 0;
	height: 2px;
	background: var(--accent-card);
	transform: scaleX(0);
	transform-origin: left;
	transition: transform 0.4s var(--ease);
}
.card:hover .card-line { transform: scaleX(1); }

.card-top {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.card-category {
	font-family: var(--font-mono);
	font-size: 0.68rem;
	color: var(--muted);
	text-transform: uppercase;
	letter-spacing: 0.12em;
}
.card-tag {
	font-family: var(--font-mono);
	font-size: 0.65rem;
	padding: 0.2rem 0.6rem;
	border: 1px solid var(--accent-card);
	border-radius: 100px;
	color: var(--accent-card);
	letter-spacing: 0.08em;
}
.card h3 { color: var(--text); font-size: 1.1rem; margin: 0; }
.card p  { font-size: 0.85rem; color: var(--muted); line-height: 1.6; margin: 0; }

.card-tech {
	display: flex;
	flex-wrap: wrap;
	gap: 0.35rem;
	margin-top: auto;
}
.card-tech span {
	font-family: var(--font-mono);
	font-size: 0.68rem;
	padding: 0.2rem 0.5rem;
	background: var(--bg);
	border-radius: 4px;
	color: var(--muted);
}

/* Modal */
.modal-backdrop {
	position: fixed;
	inset: 0;
	background: rgba(0,0,0,0.8);
	backdrop-filter: blur(12px);
	z-index: 200;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	animation: fadeIn 0.2s ease;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.modal {
	background: var(--surface);
	border: 1px solid var(--border);
	border-radius: calc(var(--radius) * 2);
	max-width: 540px;
	width: 100%;
	overflow: hidden;
	animation: slideUp 0.35s var(--ease);
	position: relative;
}
@keyframes slideUp {
	from { opacity: 0; transform: translateY(40px) scale(0.96); }
	to   { opacity: 1; transform: translateY(0) scale(1); }
}
.modal-accent-bar { height: 3px; background: var(--accent-card); }
.modal-close {
	position: absolute;
	top: 1.25rem; right: 1.25rem;
	background: var(--bg);
	border: 1px solid var(--border);
	color: var(--muted);
	width: 30px; height: 30px;
	border-radius: 50%;
	cursor: pointer;
	font-size: 0.8rem;
	display: flex; align-items: center; justify-content: center;
	transition: color 0.2s, border-color 0.2s;
}
.modal-close:hover { color: var(--text); border-color: var(--accent-card); }
.modal-body { padding: 2rem; }
.modal-img-wrap {
	margin: -2rem -2rem 1.5rem;
	overflow: hidden;
	height: 200px;
}
.modal-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
	transition: transform 0.4s var(--ease);
}
.modal-img:hover { transform: scale(1.03); }
.modal-body h3 { font-size: 1.5rem; margin: 0.5rem 0 1rem; }
.modal-body p  { color: var(--muted); line-height: 1.75; margin-bottom: 1.5rem; font-size: 0.93rem; }
.modal-tech { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 2rem; }
.modal-tech span {
	font-family: var(--font-mono);
	font-size: 0.72rem;
	padding: 0.25rem 0.65rem;
	background: var(--bg);
	border: 1px solid var(--border);
	border-radius: 4px;
	color: var(--muted);
}
.modal-actions { display: flex; gap: 0.75rem; }
.btn-primary {
	padding: 0.7rem 1.5rem;
	background: var(--accent-card);
	color: #000;
	border-radius: 100px;
	font-weight: 700;
	font-size: 0.88rem;
	transition: opacity 0.2s, transform 0.2s;
}
.btn-primary:hover { opacity: 0.85; transform: translateY(-1px); }
.btn-ghost {
	padding: 0.7rem 1.5rem;
	border: 1px solid var(--border);
	border-radius: 100px;
	font-size: 0.88rem;
	color: var(--muted);
	transition: border-color 0.2s, color 0.2s;
}
.btn-ghost:hover { border-color: var(--accent-card); color: var(--text); }

@media (max-width: 768px) {
	.card { width: 260px; padding: 1.25rem; }
	.marquee.left  { animation-duration: 20s; }
	.marquee.right { animation-duration: 20s; }
}
</style>
