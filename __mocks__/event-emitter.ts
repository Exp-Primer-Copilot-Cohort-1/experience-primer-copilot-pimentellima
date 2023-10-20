import { IEventEmitter } from "App/Core/infra/infra"

export class EventEmitterMock implements IEventEmitter {
	emit(_event: string, item: Object = {}): Promise<unknown> {
		return new Promise((resolve) => {
			setTimeout(() => resolve(item), 1000)
		})
	}
}
