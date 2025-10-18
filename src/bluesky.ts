import { AtpAgent, RichText } from '@atproto/api';
import dotenv from 'dotenv';

dotenv.config();

const identifier = process.env.BLUESKY_IDENTIFIER!;
const password = process.env.BLEUSKY_PASSWORD!;

const agent = new AtpAgent({
	service: 'https://bsky.social',
});

const login = async () => {
	await agent.login({
		identifier,
		password,
	});
};

type Post = {
	body: string;
	external: {
		title: string;
		description: string;
		url: string;
		thumb: URL['href'];
	};
};

export const post = async (post: Post) => {
	await login();

	const rt = new RichText({
		text: post.body,
	});

	await rt.detectFacets(agent);

	const { data: thumb } = await agent.uploadBlob(
		new Uint8Array(await (await (await fetch(post.external.thumb)).blob()).arrayBuffer())
	);

	await agent.post({
		text: rt.text,
		facets: rt.facets,
		embed: {
			$type: 'app.bsky.embed.external',
			external: {
				title: post.external.title,
				description: post.external.description,
				uri: post.external.url,
				thumb: thumb.blob,
			},
		},
		createdAt: new Date().toISOString(),
	});
};
