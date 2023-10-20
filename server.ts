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
import { ServerHandler } from '@ioc:Adonis/Core/TestUtils'
import { readFileSync } from 'fs'
import { createServer as ServerHTTP } from 'http'
import { createServer as ServerHTTPS } from 'https'

import { join } from 'path'
import 'reflect-metadata'
import { install } from 'source-map-support'

install({ handleUncaughtExceptions: false })

const createServerHTTPS = (handle: ServerHandler) => {
	const privateKey = readFileSync(join(__dirname + '/certs/server.key'), 'utf8')
	const certificate = readFileSync(join(__dirname + '/certs/server.crt'), 'utf8')
	const credentials = { key: privateKey, cert: certificate }

	return ServerHTTPS(credentials, handle)
}

const createServerHTTP = (handle: ServerHandler) => {
	return ServerHTTP(handle)
}

new Ignitor(__dirname).httpServer().start((handle) => {
	try {
		if (process.env.NODE_ENV !== 'production') throw new Error('Not production')

		const server = createServerHTTPS(handle)
		console.log('Server running HTTPS on https://localhost:3333')
		return server
	} catch (error) {
		const server = createServerHTTP(handle)
		console.log('Server running HTTP on http://localhost:3333')
		return server
	}
})
