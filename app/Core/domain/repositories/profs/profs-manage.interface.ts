import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IUser as IProf } from 'App/Types/IUser'
import { ICount } from '../helpers/count'

export interface ProfsManagerInterface {
	findByID: (id: string, unity_id: string) => PromiseEither<AbstractError, IProf>
	findAll: () => PromiseEither<AbstractError, IProf[]>
	getCount: () => PromiseEither<AbstractError, ICount>
}
