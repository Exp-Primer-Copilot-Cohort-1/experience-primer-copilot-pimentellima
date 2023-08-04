/*
|--------------------------------------------------------------------------
| AdonisJs Server
|--------------------------------------------------------------------------
|
| The contents in this file is meant to bootstrap the AdonisJs application
| and start the HTTP server to accept incoming connections. You must avoid
| making this file dirty and instead make use of `lifecycle hooks` provided
| by AdonisJs service providers for custom code.
|
*/

import { Ignitor } from '@adonisjs/core/build/standalone'
import { readFileSync } from 'fs'
import { createServer as createServerHTTP } from 'http'
import { createServer } from 'https'

import { join } from 'path'
import 'reflect-metadata'
import { install } from 'source-map-support'

install({ handleUncaughtExceptions: false })

new Ignitor(__dirname).httpServer().start((handle) => {
	if (process.env.NODE_ENV === 'production') {
		const privateKey = readFileSync(join(__dirname + '/certs/server.key'), 'utf8')
		const certificate = readFileSync(join(__dirname + '/certs/server.crt'), 'utf8')
		const credentials = { key: privateKey, cert: certificate }

		console.log('Server running on https://localhost:3333')

		return createServer(credentials, handle)
	}

	return createServerHTTP(handle)
})
