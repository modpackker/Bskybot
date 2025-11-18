import dotenv from 'dotenv';

import { BlueskyClient } from '../lib/bluesky.js';

dotenv.config();

const client = new BlueskyClient({
	identifier: process.env.BSKY_USERNAME!,
	password: process.env.BSKY_PASSWORD!,
});

export default client;
