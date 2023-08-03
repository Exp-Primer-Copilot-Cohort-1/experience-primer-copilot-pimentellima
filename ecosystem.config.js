/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

module.exports = {
	apps: [
		{
			name: 'dpsystem-v5',
			script: 'yarn',
			args: 'start',
			watch: true,
			max_memory_restart: '150M',
			autorestart: true,

			// instances: 'max',
			// exec_mode: 'cluster',
		},
	],
}
