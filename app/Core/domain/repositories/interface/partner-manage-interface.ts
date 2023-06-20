import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IPartner } from 'Types/IPartner'

export interface PartnerManagerInterface {
	findByName: (
		name: string,
		unity_id: string,
	) => PromiseEither<AbstractError, IPartner[]>
	createPartner: (data: Partial<IPartner>) => PromiseEither<AbstractError, IPartner>
	deletePartnerById: (id: string) => PromiseEither<AbstractError, IPartner>
	updatePartnerById: (
		id: string,
		data: Partial<IPartner>,
	) => PromiseEither<AbstractError, IPartner>
}
