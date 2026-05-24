import { env } from 'node:process';

import { BlueskyClient } from '../lib/bluesky.js';

export const bskyClient = new BlueskyClient({
	identifier: env['BLUESKY_IDENTIFIER']!,
	password: env['BLUESKY_PASSWORD']!,
});
