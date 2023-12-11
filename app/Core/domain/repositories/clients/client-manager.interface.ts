import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IUserClient, TreatmentPicture } from 'App/Types/IClient'
import { ICount } from '../helpers/count'
import { IFormAnswer } from 'App/Types/IFormAnswer'

export interface ClientManagerContract {
	getCount: (unity_id: string) => PromiseEither<AbstractError, ICount>
	findAll: (unity_id: string) => PromiseEither<AbstractError, IUserClient[]>
	findById: (id: string) => PromiseEither<AbstractError, IUserClient>
	pushFormAnswer(
		client_id: string,
		form_answer: IFormAnswer
	): PromiseEither<AbstractError, IUserClient>
	updateProfilePicture: (
		id: string,
		picture_url: string,
	) => PromiseEither<AbstractError, IUserClient>
	pushTreatmentPictures: (
		client_id: string,
		pictures: TreatmentPicture[],
	) => PromiseEither<AbstractError, IUserClient>
	create: (
		client: Partial<IUserClient>,
		unity_id: string,
	) => PromiseEither<AbstractError, IUserClient>
	updateById: (
		client: Partial<IUserClient>,
		id: string,
	) => PromiseEither<AbstractError, IUserClient>
}
