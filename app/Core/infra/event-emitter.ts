import Event, { EventsList } from '@ioc:Adonis/Core/Event'
import { injectable, registry } from 'tsyringe'

type KeysEvents = keyof EventsList

export interface IEventEmitter {
	emit(event: KeysEvents, item?: Object): Promise<unknown>
}


@injectable()
@registry([{
	token: EventEmitter,
	useClass: EventEmitter
}])
export class EventEmitter implements IEventEmitter {
	emit(event: KeysEvents, item: Object = {}): Promise<unknown> {
		return new Promise((resolve, reject) => {
			Event.emit(event, item as any)
				.then(resolve)
				.catch(reject)
		})
	}
}

@injectable()
@registry([{
	token: EventEmitterTest,
	useClass: EventEmitterTest
}])
export class EventEmitterTest implements IEventEmitter {
	emit(event: KeysEvents, item: Object = {}): Promise<unknown> {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(item), 1000)
		})
	}
}
