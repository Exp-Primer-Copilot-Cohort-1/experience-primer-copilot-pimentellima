import LoggerAdonisjs from '@ioc:Adonis/Core/Logger'
import { METHOD, colorize } from '../adapters/controller/helpers/colorize'

class Logger {
	constructor() { }

	log(url: string, method: string, statusCode: number, err?: Error | any) {
		const message = colorize(statusCode, url, method as METHOD)

		if (statusCode >= 500) {
			LoggerAdonisjs.fatal(message + '\n' + (err as Error)?.message)
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
}


export default new Logger()