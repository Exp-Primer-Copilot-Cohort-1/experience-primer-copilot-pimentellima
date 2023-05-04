import { defineConfig } from 'vitest/config'

import { config } from 'dotenv'
config()

export default defineConfig({
	root: __dirname,
	test: {
		coverage: {
			provider: 'istanbul',
			all: true,
			include: ['app/Core/**/*.ts'],
			exclude: ['**/app/Core/adapters/**', '**/app/Core/composers/**'],
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
			'**/app/Core/adapters/**',
			'**/app/Core/composers/**',
		],
		include: ['app/Core/**/*.spec.ts'],
	},
	resolve: {
		alias: {
			App: '/app',
			'@ioc:Mongoose': 'mongoose',
			'@ioc:Adonis/Core/Hash': '@adonisjs/hash/build/standalone',
		},
	},
})
