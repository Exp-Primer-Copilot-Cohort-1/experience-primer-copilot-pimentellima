/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

module.exports = {
	apps: [
		{
			name: 'dpsystem-v5',
			script: 'yarn',
			args: 'start',
			watch: true,
			max_memory_restart: '200M',
			autorestart: true,
			ignore_watch: ['node_modules', 'logs', 'docs', 'tests'], // Adicione os diretórios/arquivos que você deseja ignorar
			instances: 'max',
			exec_mode: 'cluster',
			watch_options: {
				usePolling: true, // Use polling para detecção de alterações em sistemas de arquivos montados em rede ou em máquinas virtuais
				interval: 5 * 60 * 1000, // Intervalo de 3 minutos em milissegundos antes de reiniciar após uma alteração			},
			},
		},
	],
}
