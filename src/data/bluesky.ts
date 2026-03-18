import { env } from 'node:process';

import dotenv from 'dotenv';

import { BlueskyClient } from '../lib/bluesky.js';

dotenv.config();

export const bskyClient = new BlueskyClient({
	identifier: env['BLUESKY_IDENTIFIER']!,
	password: env['BLUESKY_PASSWORD']!,
});
