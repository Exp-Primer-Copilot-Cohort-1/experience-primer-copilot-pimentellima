import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IUser as IProf } from 'App/Types/IUser'

export interface ProfManagerInterface {
	findByID: (id: string, unity_id: string) => PromiseEither<AbstractError, IProf>
	findAll: () => PromiseEither<AbstractError, IProf[]>
}
