import { env } from 'node:process';

import { BlueskyClient, type Post } from '../lib/bluesky.js';
import { getProject } from '../lib/modrinth.js';

const POST = async () => {
	const blueskyClient = new BlueskyClient({
		identifier: env['BLUESKY_IDENTIFIER']!,
		password: env['BLUESKY_PASSWORD']!,
	});

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

	await blueskyClient.login();
	await blueskyClient.post(p);
	await blueskyClient.logout();
};

await POST();
