import { ILogger } from "App/Core/infra/infra"

export class LoggerMock implements ILogger {
	constructor() { }

	log(url: string, method: string, statusCode: number, err?: Error | any) {
		return
	}

	emit(msg: string, err?: Error | any) {
		return
	}

	fatal(msg: string, err?: Error | any) {
		return
	}
}


