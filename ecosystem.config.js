/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

module.exports = {
	apps: [
		{
			name: 'dpsystem-v5',
			script: 'yarn',
			args: 'start',
			watch: false,
			max_memory_restart: '200M',
			autorestart: true,
			instances: 'max',
			exec_mode: 'cluster',
		},
	],
}
