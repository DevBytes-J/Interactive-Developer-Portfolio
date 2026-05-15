export const personal = {
	name: 'Joanna Bassey',
	title: 'Frontend Engineer',
	tagline: 'I build immersive web experiences.',
	bio: 'Passionate about crafting performant, accessible, and visually stunning interfaces. I turn complex problems into elegant digital solutions.',
	email: 'joannabassey19@gmail.com',
	github: 'https://github.com/DevBytes-J',
	linkedin: 'https://www.linkedin.com/in/joanna-bassey-554004338/',
	twitter: 'https://x.com/Bassey_Joanna',
	resume: '/resume.pdf',
	formspreeId: 'mykoqdlb'
};

export const skills = [
	{ name: 'Svelte / SvelteKit', level: 95 },
	{ name: 'TypeScript', level: 90 },
	{ name: 'React / Next.js', level: 85 },
	{ name: 'Node.js', level: 80 },
	{ name: 'CSS / Animation', level: 92 },
	{ name: 'WebGL / Three.js', level: 70 },
	{ name: 'PostgreSQL', level: 75 },
	{ name: 'Docker / CI/CD', level: 72 }
];

export type Project = {
	id: string;
	title: string;
	description: string;
	longDescription: string;
	tech: string[];
	category: string;
	image: string;
	demo: string;
	repo: string;
	featured: boolean;
};

export const projects: Project[] = [
	{
		id: 'trackyt',
		title: 'Trackyt',
		description: 'Track your expenses and income with ease.',
		longDescription: 'A full-stack expense tracker with real-time balance updates, category breakdowns, and monthly trend charts. Built with Next.js App Router, server actions for mutations, and Tailwind CSS for a clean, responsive UI.',
		tech: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
		category: 'fullstack',
		image: '/trackyt.png',
		demo: 'https://trackyt-f.onrender.com/',
		repo: 'https://github.com/DevBytes-J',
		featured: true
	},
	{
		id: 'postsyncer',
		title: 'PostSyncer',
		description: 'Manage social accounts, schedule content, and create AI videos in minutes.',
		longDescription: 'An AI-powered social media management platform. Connect multiple accounts, schedule posts across platforms, and generate short-form video content using AI. Features a rich content editor, analytics dashboard, and OAuth integrations.',
		tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
		category: 'ai',
		image: '/postsync.png',
		demo: 'https://postsyncc.vercel.app/',
		repo: 'https://github.com/DevBytes-J',
		featured: true
	},
	{
		id: 'tio',
		title: 'Tio',
		description: 'Explore homes where every room is designed with comfort and style.',
		longDescription: 'A premium real estate showcase with immersive room-by-room browsing, smooth page transitions, and a curated property listing experience. Designed with a focus on visual storytelling and elegant typography.',
		tech: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
		category: 'frontend',
		image: '/tio.png',
		demo: 'https://tio-seven.vercel.app/',
		repo: 'https://github.com/DevBytes-J',
		featured: true
	},
	{
		id: 'superx',
		title: 'Super𝕏',
		description: 'The All-in-One Growth OS for Serious 𝕏 Creators.',
		longDescription: 'A marketing landing page for a creator growth toolkit targeting X (Twitter) power users. Features animated sections, feature breakdowns, pricing tiers, and a bold visual identity built to convert.',
		tech: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
		category: 'frontend',
		image: '/superx.png',
		demo: 'https://studiox-flame-five.vercel.app/',
		repo: 'https://github.com/DevBytes-J',
		featured: false
	},
	{
		id: 'ecommerce',
		title: 'E-Commerce',
		description: 'Frontend Mentor challenge with full cart functionality.',
		longDescription: 'A pixel-perfect Frontend Mentor challenge implementation featuring a product gallery with image zoom, size/color selectors, a persistent cart with quantity controls, and fully responsive layouts — all in vanilla React and CSS.',
		tech: ['React', 'CSS', 'JavaScript'],
		category: 'frontend',
		image: '/ecommerce.png',
		demo: 'https://frontend-mentor-e-commerce-product-three.vercel.app/',
		repo: 'https://github.com/DevBytes-J',
		featured: false
	},
	{
		id: 'audiophile',
		title: 'Audiophile',
		description: 'Multi-page e-commerce website for premium audio equipment.',
		longDescription: 'A multi-page e-commerce site for a premium audio brand. Includes product listing, detail pages, a fully functional cart with localStorage persistence, order summary, and a checkout flow — all built with Next.js and Tailwind.',
		tech: ['Next.js', 'Tailwind CSS'],
		category: 'frontend',
		image: '/audiophile.png',
		demo: 'https://audiophile-ecommerce-website-527b.vercel.app/',
		repo: 'https://github.com/DevBytes-J',
		featured: false
	},
	{
		id: 'space-tourism',
		title: 'Space Tourism',
		description: 'Interactive space tourism website with stunning visuals.',
		longDescription: 'A Frontend Mentor challenge recreating a space tourism website with tabbed navigation for destinations, crew, and technology pages. Features full-bleed background images, animated tab transitions, and a responsive layout.',
		tech: ['HTML', 'CSS', 'JavaScript'],
		category: 'creative',
		image: '/space.png',
		demo: 'https://space-tourism-website-puce-chi.vercel.app/',
		repo: 'https://github.com/DevBytes-J',
		featured: false
	},
	{
		id: 'profile-card',
		title: 'Profile Card',
		description: 'Clean and modern profile card component.',
		longDescription: 'A polished profile card UI component with a layered background, avatar, social stats, and a clean typographic hierarchy. Built as a standalone CSS challenge focusing on precise layout and visual balance.',
		tech: ['HTML', 'CSS', 'JavaScript'],
		category: 'frontend',
		image: '/mprofile.png',
		demo: 'https://profile-i14.vercel.app/',
		repo: 'https://github.com/DevBytes-J',
		featured: false
	}
];

export const categories = ['all', 'frontend', 'fullstack', 'ai', 'creative'];
