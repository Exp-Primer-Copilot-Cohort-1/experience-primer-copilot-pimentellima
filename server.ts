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
import cluster from 'cluster'
import { readFileSync } from 'fs'
import { createServer as ServerHTTP } from 'http'
import { createServer as ServerHTTPS } from 'https'

import { join } from 'path'
import 'reflect-metadata'
import { install } from 'source-map-support'

install({ handleUncaughtExceptions: false })

const createServerHTTPS = (handle: ServerHandler) => {

	const privateKey = readFileSync(join(process.env.CERTS as string, 'fullchain.pem'), 'utf8')
	const certificate = readFileSync(join(process.env.CERTS as string, 'privkey.pem'), 'utf8')
	const credentials = { key: privateKey, cert: certificate }

	return ServerHTTPS(credentials, handle)
}

const createServerHTTP = (handle: ServerHandler) => {
	return ServerHTTP(handle)
}

const Init = async () => await new Ignitor(__dirname).httpServer().start((handle) => {
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

const runPrimaryProcess = () => {
	// const cpus = os.cpus().length

	console.log(`Primary ${process.pid} is running`)
	console.log(`Forking Server with ${1} processes\n`)

	for (let index = 0; index < 1; index++) cluster.fork()

	// When Worker process has died, Log the worker
	cluster.on('exit', (worker, code, signal) => {
		if (code !== 0 && !worker.exitedAfterDisconnect) {
			cluster.fork()
		}
	})
}

const runWorkerProcess = async () => {
	// if Worker process, master is false, cluster.isWorker is true
	// worker starts server for individual cpus
	// the worker created above is starting server
	await Init()
}

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess()
