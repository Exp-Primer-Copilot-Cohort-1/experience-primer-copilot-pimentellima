import LoggerAdonisjs from '@ioc:Adonis/Core/Logger'


class Logger {
	constructor() { }

	log(message: string, statusCode: number) {

		if (statusCode >= 500) {
			LoggerAdonisjs.fatal(message)
		}

		if (statusCode >= 400 && statusCode < 500) {
			LoggerAdonisjs.error(message)
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