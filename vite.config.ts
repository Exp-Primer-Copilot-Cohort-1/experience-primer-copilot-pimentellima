import { config } from 'dotenv';
import 'reflect-metadata';
import swc from "rollup-plugin-swc";
import { defineConfig } from 'vitest/config';
config()

export default defineConfig({
	root: __dirname,
	plugins: [
		swc({
			jsc: {
				parser: {
					syntax: "typescript",
					// tsx: true, // If you use react
					dynamicImport: true,
					decorators: true,
				},
				target: "es2021",
				transform: {
					decoratorMetadata: true,
				},
			},
		}),
	],
	esbuild: false,
	test: {
		setupFiles: ['./setupTests.ts', './setupMocks.ts'],
		coverage: {
			enabled: false,
			provider: 'istanbul',
			all: true,
			include: ['app/Core/**/*.ts'],
			exclude: ['**/.docker/**', 'app/Core/composers/**'],
		},
		reporters: ['html', 'default'],
		testTimeout: 5000000,
		exclude: [
			'**/node_modules/**',
			'**/dist/**',
			'**/.docker/**',
			'**/tests/functional/**',
		],
		include: ['app/Core/**/*.spec.ts'],
		watch: false,

	},
	resolve: {
		alias: {
			App: '/app',
			'@ioc:Mongoose': 'mongoose',
			'@ioc:Adonis/Core/Hash': '@adonisjs/hash/build/standalone',
			'@ioc:Adonis/Core/Event': '@adonisjs/events/build/standalone',
			'@ioc:Adonis/Core/Env': '@adonisjs/env/build/src',
		},
	},
})
