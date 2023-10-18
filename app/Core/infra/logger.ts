import LoggerAdonisjs from '@ioc:Adonis/Core/Logger'
import { Methods } from 'App/Types/IHelpers'
import { registry, singleton } from 'tsyringe'
import { colorize } from '../adapters/controller/helpers/colorize'

export interface ILogger {
	log: (url: string, method: string, statusCode: number, err?: Error | any) => void
	emit: (msg: string, err?: Error | any) => void
	fatal: (msg: string, err?: Error | any) => void
}

@singleton()
@registry([{ token: Logger, useClass: Logger }])
export class Logger implements ILogger {
	constructor() { }

	log(url: string, method: string, statusCode: number, err?: Error | any) {
		const message = colorize(statusCode, url, method as Methods)

		if (statusCode >= 500) {
			LoggerAdonisjs.error(message + '\n' + (err as Error)?.message)
		}

		if (statusCode >= 400 && statusCode < 500) {
			LoggerAdonisjs.error(message, err)
		}

		if (statusCode >= 300 && statusCode < 400) {
			LoggerAdonisjs.warn(message)
		}

		if (statusCode >= 200 && statusCode < 300) {
			LoggerAdonisjs.info(message)
		}
	}

	emit(msg: string, err?: Error | any) {
		LoggerAdonisjs.info(msg, err)
	}

	fatal(msg: string, err?: Error | any) {
		console.log(msg, err)
		LoggerAdonisjs.error(msg, err)
	}
}


export default new Logger()