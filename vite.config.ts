import { defineConfig } from 'vitest/config';

import { config } from 'dotenv';
config();

export default defineConfig({
	root: __dirname,
	test: {
		coverage: {
			provider: 'istanbul', // or 'c8'
		},
		reporters: ['html', 'default'],
		testTimeout: 5000000,
		deps: {
			inline: true,
		},
		exclude: [
			'**/node_modules/**',
			'**/dist/**',
			'**/.docker/**',
			'**/tests/functional/**',
		],
	},
	resolve: {
		alias: {},
	},
});
