import { writable } from 'svelte/store';

export const selected = writable(['Design', 'Development', 'Production']);
export const disciplines = writable({
	Design: true,
	Development: true,
	Production: true
});

export const handler = {
	toggle: (key: string, b: boolean) => () => {
		disciplines.update((d: any) => {
			d[key] = !b;
			return d;
		});
		selected.update((s: any) => {
			if (b) {
				s = s.filter((i: string) => i !== key);
			} else {
				s.push(key);
			}
			return s;
		});
	}
};
