<script lang="ts">
	import { onMount } from 'svelte';
	import { personal, skills, projects } from '$lib/data';

	type Line = { type: 'input' | 'output' | 'error' | 'system'; text: string };

	const COMMANDS: Record<string, () => string[]> = {
		help: () => [
			'',
			'  COMMANDS',
			'  ────────────────────────────────────',
			'  help        show this help',
			'  about       who am I',
			'  skills      technical skills',
			'  projects    list projects',
			'  contact     get in touch',
			'  social      social links',
			'  whoami      current user',
			'  date        current date/time',
			'  clear       clear terminal',
			''
		],
		about: () => ['', personal.bio, '', `  email    ${personal.email}`, ''],
		whoami: () => [`${personal.name} — ${personal.title}`],
		skills: () => [
			'',
			...skills.map(s => `  ${s.name.padEnd(24)} ${'▓'.repeat(Math.round(s.level / 10))}${'░'.repeat(10 - Math.round(s.level / 10))}  ${s.level}%`),
			''
		],
		projects: () => ['', ...projects.map((p, i) => `  ${String(i + 1).padStart(2, '0')}  ${p.title}`), ''],
		contact: () => ['', `  email     ${personal.email}`, `  github    ${personal.github}`, `  linkedin  ${personal.linkedin}`, ''],
		social: () => ['', `  github    ${personal.github}`, `  linkedin  ${personal.linkedin}`, `  twitter   ${personal.twitter}`, ''],
		date: () => [new Date().toLocaleString()],
	};

	let input = $state('');
	let lines = $state<Line[]>([
		{ type: 'system', text: `  ${personal.name} — interactive terminal` },
		{ type: 'system', text: `  type "help" to see available commands` },
		{ type: 'system', text: '' }
	]);
	let historyIndex = $state(-1);
	let cmdHistory = $state<string[]>([]);
	let inputEl: HTMLInputElement;
	let terminalEl: HTMLElement;
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

	function scrollToBottom() {
		setTimeout(() => { if (terminalEl) terminalEl.scrollTop = terminalEl.scrollHeight; }, 10);
	}

	function run(cmd: string) {
		const trimmed = cmd.trim().toLowerCase();
		lines = [...lines, { type: 'input', text: cmd }];
		if (!trimmed) { scrollToBottom(); return; }
		if (trimmed === 'clear') { lines = []; scrollToBottom(); return; }
		const handler = COMMANDS[trimmed];
		if (handler) {
			lines = [...lines, ...handler().map(t => ({ type: 'output' as const, text: t }))];
		} else {
			lines = [...lines, { type: 'error', text: `  command not found: ${trimmed}` }];
		}
		scrollToBottom();
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			const cmd = input;
			if (cmd.trim()) { cmdHistory = [cmd, ...cmdHistory.slice(0, 49)]; historyIndex = -1; }
			run(cmd);
			input = '';
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			historyIndex = Math.min(historyIndex + 1, cmdHistory.length - 1);
			input = cmdHistory[historyIndex] ?? '';
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			historyIndex = Math.max(historyIndex - 1, -1);
			input = historyIndex === -1 ? '' : cmdHistory[historyIndex];
		} else if (e.key === 'Tab') {
			e.preventDefault();
			const match = Object.keys(COMMANDS).concat(['clear']).find(c => c.startsWith(input.toLowerCase()));
			if (match) input = match;
		}
	}
</script>

<section id="terminal" class="section" bind:this={section} aria-label="Interactive terminal">
	<div class="container">
		<div class="terminal-header">
			<span class="section-num" aria-hidden="true">04</span>
			<div class="reveal-line" class:in={visible}>
				<h2>Terminal</h2>
			</div>
		</div>

		<div class="terminal" class:in={visible} onclick={() => inputEl?.focus()} aria-label="Terminal emulator">
			<div class="t-bar" aria-hidden="true">
				<div class="t-dots">
					<span class="dot-r"></span>
					<span class="dot-y"></span>
					<span class="dot-g"></span>
				</div>
				<span class="t-title">{personal.name.toLowerCase().replace(' ', '')}@portfolio</span>
			</div>
			<div class="t-body" bind:this={terminalEl} role="log" aria-live="polite">
				{#each lines as line}
					<div class="line {line.type}">{line.text}</div>
				{/each}
				<div class="input-row">
					<span class="prompt" aria-hidden="true">❯</span>
					<input
						bind:this={inputEl}
						bind:value={input}
						onkeydown={onKeydown}
						class="t-input"
						autocomplete="off"
						autocorrect="off"
						autocapitalize="off"
						spellcheck={false}
						aria-label="Terminal input"
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
.terminal-header {
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

.terminal {
	border-radius: calc(var(--radius) * 1.5);
	overflow: hidden;
	border: 1px solid var(--border);
	background: #050508;
	box-shadow: 0 32px 80px rgba(0,0,0,0.6);
	cursor: text;
	opacity: 0;
	transform: translateY(24px);
	transition: opacity 0.7s var(--ease) 0.15s, transform 0.7s var(--ease) 0.15s;
}
.terminal.in {
	opacity: 1;
	transform: translateY(0);
}

.t-bar {
	background: #0d0d12;
	padding: 0.85rem 1.25rem;
	display: flex;
	align-items: center;
	gap: 0.75rem;
	border-bottom: 1px solid rgba(255,255,255,0.04);
}
.t-dots { display: flex; gap: 0.4rem; }
.dot-r, .dot-y, .dot-g {
	width: 11px; height: 11px;
	border-radius: 50%;
}
.dot-r { background: #ff5f57; }
.dot-y { background: #febc2e; }
.dot-g { background: #28c840; }
.t-title {
	font-family: var(--font-mono);
	font-size: 0.72rem;
	color: #3a3a4a;
	margin-left: auto;
}

.t-body {
	padding: 1.5rem;
	min-height: 380px;
	max-height: 500px;
	overflow-y: auto;
	font-family: var(--font-mono);
	font-size: 0.82rem;
	line-height: 1.8;
}
.t-body::-webkit-scrollbar { width: 3px; }
.t-body::-webkit-scrollbar-thumb { background: #1a1a24; }

.line { white-space: pre-wrap; word-break: break-all; }
.line.input { color: var(--accent); }
.line.input::before { content: '❯ '; color: #444; }
.line.output { color: #5a5a7a; }
.line.error { color: #ff6b6b; }
.line.system { color: #3a5a3a; }

.input-row { display: flex; align-items: center; gap: 0.6rem; margin-top: 0.25rem; }
.prompt { color: #444; font-size: 0.82rem; }
.t-input {
	flex: 1;
	background: none;
	border: none;
	outline: none;
	color: var(--accent);
	font-family: var(--font-mono);
	font-size: 0.82rem;
	caret-color: var(--accent);
}

@media (max-width: 768px) {
	.t-body { min-height: 280px; max-height: 360px; padding: 1rem; font-size: 0.75rem; }
}
</style>
