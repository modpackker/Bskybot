import dotenv from 'dotenv';

import { BlueskyClient } from '../lib/bluesky.js';

dotenv.config();

const client = new BlueskyClient({
	identifier: process.env.BLUESKY_IDENTIFIER!,
	password: process.env.BLUESKY_PASSWORD!,
});

export default client;
