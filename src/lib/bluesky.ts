import { AtpAgent, RichText } from '@atproto/api';

export type Post =
	| {
			type: 'text';
			body: string;
	  }
	| {
			type: 'external';
			body: string;
			external: {
				title: string;
				description: string;
				url: string;
				thumb: URL['href'];
			};
	  };

export class BlueskyClient {
	service = 'https://bsky.social';

	identifier: string;
	password: string;

	agent: AtpAgent;

	constructor({ identifier, password }: { identifier: string; password: string }) {
		this.identifier = identifier;
		this.password = password;

		this.agent = new AtpAgent({
			service: this.service,
		});
	}

	async login() {
		await this.agent.login({
			identifier: this.identifier,
			password: this.password,
		});
	}

	async logout() {
		await this.agent.logout();
	}

	async post(p: Post) {
		const rt = new RichText({
			text: p.body,
		});
		await rt.detectFacets(this.agent);

		switch (p.type) {
			case 'text':
				await this.agent.post({
					text: rt.text,
					facets: rt.facets,
					createdAt: new Date().toISOString(),
				});

				break;
			case 'external':
				const { data: thumb } = await this.agent.uploadBlob(
					new Uint8Array(await (await (await fetch(p.external.thumb)).blob()).arrayBuffer())
				);

				await this.agent.post({
					text: rt.text,
					facets: rt.facets,
					embed: {
						$type: 'app.bsky.embed.external',
						external: {
							title: p.external.title,
							description: p.external.description,
							uri: p.external.url,
							thumb: thumb.blob,
						},
					},
					createdAt: new Date().toISOString(),
				});

				break;
		}
	}
}
