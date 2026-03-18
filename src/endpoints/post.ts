import { bskyClient } from '../data/bluesky.js';
import type { Post } from '../lib/bluesky.js';
import { getProject } from '../lib/modrinth.js';

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

	await bskyClient.login();
	await bskyClient.post(p);
	await bskyClient.logout();
};

await POST();
