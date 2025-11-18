import type { Post } from '../lib/bluesky.js';

import client from '../data/bluesky.js';
import { getProject } from '../data/modrinth.js';

const POST = async () => {
	const project = await getProject();

	const p: Post = {
		type: 'external',
		body: [
			project.summary,
			'#Minecraft #mcdev',
			`https://modpackker.vercel.app/project/${project.slug}`,
		].join('\n\n'),
		external: {
			title: `${project.name} • Modpackker`,
			description: 'Craft your modpacks!',
			url: `https://modpackker.vercel.app/project/${project.slug}`,
			thumb: project.banner,
		},
	};

	await client.login();
	await client.post(p);
	await client.logout();
};

await POST();
