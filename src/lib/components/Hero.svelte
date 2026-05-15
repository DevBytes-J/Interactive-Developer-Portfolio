<script lang="ts">
	import { onMount } from 'svelte';
	import { personal } from '$lib/data';
	import { reducedMotion } from '$lib/stores';

	let visible = $state(false);
	let mouseX = $state(0);
	let mouseY = $state(0);

	const roles = ['Frontend Engineer', 'UI/UX Craftsperson', 'Animation Nerd', 'Svelte Enthusiast'];
	let roleIndex = $state(0);
	let displayed = $state('');
	let typing = $state(true);

	onMount(() => {
		visible = true;

		const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement;
		const ctx = canvas.getContext('2d')!;
		let raf: number;
		const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
		resize();
		window.addEventListener('resize', resize, { passive: true });

		const dots = Array.from({ length: 60 }, () => ({
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
			vx: (Math.random() - 0.5) * 0.3,
			vy: (Math.random() - 0.5) * 0.3,
			r: Math.random() * 1.5 + 0.5,
		}));

		function draw() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (const d of dots) {
				d.x += d.vx; d.y += d.vy;
				if (d.x < 0) d.x = canvas.width;
				if (d.x > canvas.width) d.x = 0;
				if (d.y < 0) d.y = canvas.height;
				if (d.y > canvas.height) d.y = 0;
				ctx.beginPath();
				ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
				ctx.fillStyle = 'rgba(232,255,0,0.35)';
				ctx.fill();
			}
			for (let i = 0; i < dots.length; i++) {
				for (let j = i + 1; j < dots.length; j++) {
					const dx = dots[i].x - dots[j].x;
					const dy = dots[i].y - dots[j].y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < 120) {
						ctx.beginPath();
						ctx.moveTo(dots[i].x, dots[i].y);
						ctx.lineTo(dots[j].x, dots[j].y);
						ctx.strokeStyle = `rgba(232,255,0,${0.08 * (1 - dist / 120)})`;
						ctx.lineWidth = 0.5;
						ctx.stroke();
					}
				}
			}
			raf = requestAnimationFrame(draw);
		}
		draw();

		const onMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
		window.addEventListener('mousemove', onMove, { passive: true });

		if (!$reducedMotion) {
			let charIndex = 0;
			let timeout: ReturnType<typeof setTimeout>;
			function typeNext() {
				const current = roles[roleIndex];
				if (typing) {
					displayed = current.slice(0, ++charIndex);
					if (charIndex < current.length) timeout = setTimeout(typeNext, 65);
					else timeout = setTimeout(() => { typing = false; typeNext(); }, 2000);
				} else {
					displayed = current.slice(0, --charIndex);
					if (charIndex > 0) timeout = setTimeout(typeNext, 30);
					else { roleIndex = (roleIndex + 1) % roles.length; typing = true; timeout = setTimeout(typeNext, 400); }
				}
			}
			typeNext();
			return () => {
				clearTimeout(timeout);
				cancelAnimationFrame(raf);
				window.removeEventListener('mousemove', onMove);
				window.removeEventListener('resize', resize);
			};
		} else {
			displayed = roles[0];
		}

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('mousemove', onMove);
			window.removeEventListener('resize', resize);
		};
	});
</script>

<section id="hero" aria-label="Hero" class="hero">
	<canvas class="hero-canvas" aria-hidden="true" id="hero-canvas"></canvas>
	<div class="hero-glow" style="left: {mouseX}px; top: {mouseY}px" aria-hidden="true"></div>

	<div class="container">
		<div class="hero-inner" class:visible>
			<div class="hero-label reveal-line stagger-1" class:in={visible}>
				<span>
					<span class="dot" aria-hidden="true"></span>
					Available for work
				</span>
			</div>

			<h1 class="hero-name" aria-label={personal.name}>
				<span class="reveal-line" class:in={visible} style="transition-delay: 0.1s">
					<span>{personal.name}</span>
				</span>
			</h1>

			<div class="hero-sub reveal-line stagger-3" class:in={visible}>
				<span class="role-text" aria-label="Role: {roles[roleIndex]}">
					{displayed}<span class="cursor" aria-hidden="true">_</span>
				</span>
			</div>

			<p class="hero-bio reveal-line stagger-4" class:in={visible}>
				<span>{personal.bio}</span>
			</p>

			<div class="hero-actions reveal-line" style="transition-delay: 0.5s" class:in={visible}>
				<span>
					<a href="#projects" class="btn-primary">View Work →</a>
					<a href={personal.github} target="_blank" rel="noopener noreferrer" class="btn-ghost">GitHub ↗</a>
				</span>
			</div>
		</div>
	</div>

	<div class="hero-scroll" aria-hidden="true">
		<span>scroll</span>
		<div class="scroll-bar"></div>
	</div>

	<div class="hero-number" aria-hidden="true">01</div>
</section>

<style>
.hero {
	min-height: 100vh;
	display: flex;
	align-items: flex-end;
	padding-bottom: 6rem;
	position: relative;
	border-bottom: 1px solid var(--border);
	overflow: hidden;
}

.hero-canvas {
	position: absolute;
	inset: 0;
	pointer-events: none;
	z-index: 0;
}

.hero-glow {
	position: fixed;
	width: 600px;
	height: 600px;
	border-radius: 50%;
	background: radial-gradient(circle, rgba(232,255,0,0.06) 0%, transparent 70%);
	transform: translate(-50%, -50%);
	pointer-events: none;
	z-index: 0;
	transition: left 0.1s ease, top 0.1s ease;
}

.container { position: relative; z-index: 1; }

.hero-inner { padding-top: 5rem; }

.hero-label {
	font-family: var(--font-mono);
	font-size: 0.72rem;
	color: var(--muted);
	letter-spacing: 0.15em;
	text-transform: uppercase;
	margin-bottom: 2rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;
}
.hero-label span { display: flex; align-items: center; gap: 0.5rem; }
.dot {
	width: 6px; height: 6px;
	border-radius: 50%;
	background: var(--accent);
	animation: pulse 2s ease-in-out infinite;
	flex-shrink: 0;
}
@keyframes pulse {
	0%, 100% { opacity: 1; transform: scale(1); }
	50% { opacity: 0.5; transform: scale(0.7); }
}

.hero-name { margin-bottom: 2rem; color: var(--text); }
.hero-name .reveal-line { display: block; }

.hero-sub {
	font-size: clamp(1.1rem, 2.5vw, 1.6rem);
	color: var(--muted);
	margin-bottom: 1.5rem;
	font-weight: 400;
	min-height: 2.2rem;
}
.role-text { color: var(--text); }
.cursor {
	display: inline-block;
	color: var(--accent);
	animation: blink 1s step-end infinite;
}
@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

.hero-bio {
	max-width: 480px;
	color: var(--muted);
	font-size: 1rem;
	line-height: 1.7;
	margin-bottom: 3rem;
}

.hero-actions span {
	display: flex;
	align-items: center;
	gap: 1.5rem;
	flex-wrap: wrap;
}

.btn-primary {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 1rem 2.5rem;
	background: var(--accent);
	color: #000;
	font-weight: 700;
	font-size: 0.95rem;
	border-radius: 100px;
	transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease);
	letter-spacing: -0.01em;
}
.btn-primary:hover {
	transform: translateY(-2px);
	box-shadow: 0 12px 40px rgba(232,255,0,0.3);
}

.btn-ghost {
	font-size: 0.9rem;
	color: var(--muted);
	font-weight: 500;
	transition: color 0.2s;
	letter-spacing: -0.01em;
}
.btn-ghost:hover { color: var(--text); }

.hero-scroll {
	position: absolute;
	bottom: 2.5rem;
	right: 2.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.75rem;
	font-family: var(--font-mono);
	font-size: 0.65rem;
	color: var(--muted);
	letter-spacing: 0.15em;
	text-transform: uppercase;
	writing-mode: vertical-rl;
}
.scroll-bar {
	width: 1px;
	height: 60px;
	background: linear-gradient(to bottom, var(--muted), transparent);
	animation: scrollAnim 2s ease-in-out infinite;
	transform-origin: top;
}
@keyframes scrollAnim {
	0% { transform: scaleY(0); opacity: 0; }
	40% { transform: scaleY(1); opacity: 1; }
	100% { transform: scaleY(1); opacity: 0; transform-origin: bottom; }
}

.hero-number {
	position: absolute;
	bottom: 2.5rem;
	left: 2.5rem;
	font-family: var(--font-mono);
	font-size: 0.65rem;
	color: var(--border);
	letter-spacing: 0.1em;
}

@media (max-width: 768px) {
	.hero { align-items: center; padding-bottom: 2rem; }
	.hero-inner { padding-top: 5rem; }
	.hero-scroll, .hero-number { display: none; }
	.hero-actions span { flex-direction: column; align-items: flex-start; }
}
</style>
