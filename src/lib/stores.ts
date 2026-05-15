import { writable } from 'svelte/store';

export const theme = writable<'dark' | 'light'>('dark');
export const activeSection = writable<string>('hero');
export const reducedMotion = writable<boolean>(false);
