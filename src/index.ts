import { post } from './bluesky.js';
import { getProject } from './modrinth.js';

const POST = async () => {
	const project = await getProject();

	const p = {
		body: [
			project.summary,
			'#Minecraft #mcdev',
			`https://modpackker.vercel.app/project/${project.slug}`,
		].join('\n\n'),
		external: {
			title: 'Modpackker',
			description: 'Craft your modpacks!',
			url: `https://modpackker.vercel.app/project/${project.slug}`,
			thumb: project.banner,
		},
	};

	await post(p);
};

await POST();
