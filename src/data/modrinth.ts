import { tryCatch } from '../lib/trycatch.js';

export type RawProjectResult = {
	slug: string;

	name: string;
	icon_url: string;
	summary: string;

	featured_gallery: null | string;
	gallery: string[];
};
export type RawSearch = {
	hits: RawProjectResult[];
	page: number;
	hits_per_page: number;
	total_hits: number;
};

export type Project = {
	slug: string;
	name: string;
	summary: string;
	banner: string;
};

const endpoint = 'https://api.modrinth.com/v3/search?index=updated&limit=1';

export const getProject = async (): Promise<Project> => {
	const { data, error } = await tryCatch(() =>
		fetch(endpoint).then((res) => res.json() as unknown as RawSearch)
	);

	if (error || !data) {
		throw new Error("Can't connect to Modrinth");
	}

	const p = data.hits[0];

	return {
		slug: p.slug,
		name: p.name,
		summary: p.summary,
		banner: p.featured_gallery ?? p.gallery[0] ?? p.icon_url,
	} as Project;
};
