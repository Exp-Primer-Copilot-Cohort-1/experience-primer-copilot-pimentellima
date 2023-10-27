import { EventsList } from '@ioc:Adonis/Core/Event'
import { EdgeValues } from '../domain/use-cases/helpers/edge'

export type KeysEvents = keyof EventsList

export interface IEventEmitter {
	emit(event: KeysEvents, item?: Object): Promise<unknown>
}

export interface IEvn {
	isProd: boolean
	get: (key: string) => string | undefined
}

export interface CacheContract {
	set(key: string, value: Object, seconds?: number): Promise<string>
	get(key: string): Promise<Object | null>
	delete(key: string | string[]): Promise<number>
	flush(): Promise<string>
	flushKey(key: string): Promise<number>
}

export interface ILogger {
	log: (url: string, method: string, statusCode: number, err?: Error | any) => void
	emit: (msg: string, err?: Error | any) => void
	fatal: (msg: string, err?: Error | any) => void
}

export interface ISessionTransaction {
	manager?: any
	options?: any
	startSession(): Promise<void>
	commitTransaction(): Promise<void>
	abortTransaction(): Promise<void>
	endSession(): Promise<void>
}

type Message = {
	from: string
	email: string,
	title: string,
	edge: EdgeValues,
	props: Record<string, any>
}
export interface IMail {
	send: (message: Message) => Promise<any>
	sendLater: (message: Message) => Promise<any>
}