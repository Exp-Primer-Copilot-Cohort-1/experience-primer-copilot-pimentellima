/**
 * Config source: https://git.io/JY0mp
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import type { AuthConfig } from '@ioc:Adonis/Addons/Auth'

/*
|--------------------------------------------------------------------------
| Authentication Mapping
|--------------------------------------------------------------------------
|
| List of available authentication mapping. You must first define them
| inside the `contracts/auth.ts` file before mentioning them here.
|
*/
const authConfig: AuthConfig = {
	guard: 'web',
	guards: {
		web: {
			driver: 'session',
			provider: {
				driver: 'mongo',
			},
		},
		api: {
			driver: 'oat',
			expiresIn: '1d',
			tokenProvider: {
				driver: 'redis',
				redisConnection: 'local',
				foreignKey: 'user_id',
				type: 'bearer',
			},
			provider: {
				driver: 'mongo',
			},
		},
	},
}

export default authConfig
