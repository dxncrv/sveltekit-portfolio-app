import {
	alive,
	flash,
	vag,
	towners,
	clock,
	g4c,
	da,
	grove,
	sharin,
	evokar,
	intensity
} from '../../lib/images/index';
import {
	a_a1m1,
	a_a1m2,
	a_a1m3,
	a_a1m4,
	a_a1m5,
	a_a1m6,
	a_a1mdemo,
	a_a2m1,
	a_a2m2,
	a_a2m3,
	a_a2m4,
	a_a2m5,
	a_a2m6,
	f_a1m1,
	f_a1m2,
	f_a1m3,
	f_a1m4,
	f_a1m5,
	f_a1m6,
	f_a1mdemo,
	f_a2mdemo,
	v_m1,
	v_m2,
	v_m3,
	v_m4,
	v_mdemo,
	d_m1,
	d_m2,
	d_m3,
	d_m4,
	d_mdemo,
	c_m1,
	c_m2,
	c_m3,
	c_mdemo,
	hh_m1,
	hh_m2,
	hh_m3,
	hh_mdemo,
	da_m1,
	da_m2,
	da_m3,
	g_m1,
	g_m2,
	g_m3,
	g_mdemo,
	s_m1,
	s_m2,
	s_m3,
	s_m4,
	s_m5,
	s_m6,
	s_m7,
	s_mdemo,
	e_m1,
	e_m2,
	e_m3,
	e_m4,
	e_m5,
	e_m6,
	i_m1,
	i_mdemo,
	cover_a1,
	cover_f1,
	cover_f2,
	cover_v1,
	cover_c1,
	cover_a2,
	cover_d,
	cover_hh,
	cover_da,
	cover_g,
	cover_s,
	cover_e,
	cover_i
} from '../../lib/readermedia/index';
import { writable } from 'svelte/store';

type Project = {
	id: number;
	cover: string;
	title: string;
	description: string;
	video: string;
	tags: string[];
	content: {
		[key: string]: {
			description: string;
		};
	};
};

function createProjects() {
	const data = [
		{
			id: 1,
			cover: alive,
			title: 'ALIVE Investigator',
			description:
				'An open world game with feedback variation, developed as part of a research project to observe user inquiry while solving an ecological issue in a virtual environment.',
			video: a_a1mdemo,
			tags: ['Design', 'Development', 'Production'],
			content: {
				Design: { description: 'hello design world' },
				Development: { description: 'hello dev world' },
				Production: { description: 'hello prod world' }
			}
		},
		{
			id: 2,
			cover: flash,
			title: 'FlashoVR',
			description:
				'A fire investigation simulator that offers students a 3D serious game format to enhance their training experience and practice investigation skills.',
			video: f_a1mdemo,
			tags: ['Design', 'Development', 'Production'],
			content: {
				Design: { description: 'hello design world' },
				Development: { description: 'hello dev world' },
				Production: { description: 'hello prod world' }
			}
		},
		{
			id: 3,
			cover: vag,
			title: 'The Imitation Game',
			description:
				'A Vancouver Artgallery exhibition, for which I coordinated, produced, and sourced digital assets, helped author 2 optical installations, and styled a tooltip for publication.',
			video: v_mdemo,
			tags: ['Design', 'Development', 'Production'],
			content: {
				Design: { description: 'hello design world' },
				Development: { description: 'hello dev world' },
				Production: { description: 'hello prod world' }
			}
		},
		{
			id: 4,
			cover: towners,
			title: 'Tebbie Towners',
			description:
				'A game for cultivating empathetic listening and inclusivity in younger generations, designed using ethical captology and behavioral frameworks to elicit positive change.',
			video: d_mdemo,
			tags: ['Design'],
			content: {
				Design: { description: 'hello design world' }
			}
		},
		{
			id: 5,
			cover: clock,
			title: 'Clockwork',
			description:
				'A software as a service (SaaS) that streamlines communication, enhances vision alignment, and promotes task clarity within teams.',
			video: c_mdemo,
			tags: ['Design'],
			content: {
				Design: { description: 'hello design world' }
			}
		}
	];
	const { subscribe, set } = writable([] as Project[]);
	return {
		subscribe,
		getProjects: (tags: string[]) => {
			let projects: any = data.filter((p) => {
				return p.tags.some((t) => tags.includes(t));
			});
			set(projects);
		}
	};
}
export const projects = createProjects();

function createRange() {
	const { subscribe, set, update } = writable({ min: 0, max: 3 });
	return {
		subscribe,
		reset: () => set({ min: 0, max: 3 }),
		next: () => update((n) => ({ min: n.max, max: n.max + 3 })),
		prev: () => update((n) => ({ min: n.min - 3, max: n.min }))
	};
}
export const range = createRange();

function currentProject() {
	const { subscribe, set } = writable(null as Project | null);
	return {
		subscribe,
		setCurrent: (id: number, projects: any) => {
			const project = projects.find((p: Project) => p.id === id);
			set(project);
		},
		fetchContent: (project: Project | null, tags: string[]) => {
			if (project) {
				return Object.keys(project.content)
					.filter((key) => tags.includes(key))
					.map((key) => project.content[key]);
			}
		},
		close: () => {
			set(null);
		}
	};
}
export const current = currentProject();

/*
	{
		id: '6',
		cover: g4c,
		title: 'Healing Heart (G4C Impact Jam)',
		description:
			'During Impact Jam hosted by Games for Change, along with 3 multicultural remote collaborators, I created a Unity WebGL game in 10 days, winning honorable mention for most creative concept.',
		tags: ['Production']
	},
	{
		id: '7',
		cover: da,
		title: 'Digital Activism Vol. 2',
		description:
			"I designed the cover for Digital Activism Volume 2, an e-book edited by Dr. Rachel Ralph featuring CDM students' works on digital activism.",
		tags: ['Design']
	},
	{
		id: '8',
		cover: grove,
		title: 'Sacred Grove',
		description:
			'I visualized an artefact for a proposal of an AR game. The design aimed to transform the waiting room of a corporate building into a grove, with the columns as the last living trees in the world.',
		tags: ['Design']
	},
	{
		id: '9',
		cover: sharin,
		title: 'Sharin',
		description:
			"I animated a short story for a wedding ceremony, and produced 50 personalized videos for guests to interactively trigger in a live event, as an action of writing an invitation card, or 'Kankotri'.",
		tags: ['Production']
	},
	{
		id: '10',
		cover: evokar,
		title: 'Evõkar',
		description:
			'I designed an ecofriendly package in 2 sizes for 6 lampshades; inspired from origami and made solely with cardboard. The outer form encases the product and inner form cushions the product.',
		tags: ['Design']
	},
	{
		id: '11',
		cover: intensity,
		title: 'Intensity',
		description:
			'I created and produced a promotional video for a gym. The video is a flythrough of the floor layout, aiming to show the dedicated areas of workout equipment.',
		tags: ['Production']
	}
	*/
