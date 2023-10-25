import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IPartner } from 'App/Types/IPartner'

export interface PartnerManagerContract {
	findAll: (unity_id: string) => PromiseEither<AbstractError, IPartner[]>
	findByName: (
		name: string,
		unity_id: string,
	) => PromiseEither<AbstractError, IPartner[]>
	create: (data: Partial<IPartner>) => PromiseEither<AbstractError, IPartner>
	deleteByID: (id: string) => PromiseEither<AbstractError, IPartner>
	update: (
		id: string,
		data: Partial<IPartner>,
	) => PromiseEither<AbstractError, IPartner>
}
