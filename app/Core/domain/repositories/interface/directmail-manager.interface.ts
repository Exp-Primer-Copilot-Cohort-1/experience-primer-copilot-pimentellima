import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IDirectmail } from 'Types/IDirectmail'

export interface DirectmailManagerInterface {
	findByName: (
		name: string,
		unity_id: string,
	) => PromiseEither<AbstractError, IDirectmail[]>
	findById: (id: string) => PromiseEither<AbstractError, IDirectmail>
	deleteDirectmailsById: (id: string) => PromiseEither<AbstractError, IDirectmail>
	updateDirectmailsById: (
		id: string,
		data: Partial<IDirectmail>,
	) => PromiseEither<AbstractError, IDirectmail>
	updateDirectMailActive: (
		id: string,
		active: boolean,
	) => PromiseEither<AbstractError, IDirectmail>
	createDirectmails: (
		data: Partial<IDirectmail>,
	) => PromiseEither<AbstractError, IDirectmail>
}
