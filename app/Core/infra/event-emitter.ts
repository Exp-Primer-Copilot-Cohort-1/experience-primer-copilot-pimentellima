import Event from '@ioc:Adonis/Core/Event'
import { injectable, registry } from 'tsyringe'
import { IEventEmitter, KeysEvents } from './infra'

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

