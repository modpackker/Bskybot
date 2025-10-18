type RawProject = {
	slug: string;
	summary: string;
	icon_url: string;
	featured_gallery?: string;
};
export type Project = {
	slug: string;
	summary: string;
	banner: string;
};

const endpoint = 'https://api.modrinth.com/v3/search?index=updated&limit=1';

export const getProject = async (): Promise<Project> => {
	const res = await fetch(endpoint);

	const rawProject = (await res.json()).hits[0] as RawProject;

	return {
		slug: rawProject.slug,
		summary: rawProject.summary,
		banner: rawProject.featured_gallery ?? rawProject.icon_url,
	} as Project;
};
