import { AccountMongoRepository } from 'App/Core/domain/repositories'
import { AbstractError } from 'App/Core/errors/error.interface'
import { Cache } from 'App/Core/infra/cache'
import { CacheContract } from 'App/Core/infra/infra'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IAccount } from 'App/Types/IAccount'
import { inject, injectable, registry } from "tsyringe"

type TypeParams = {
	id: string,
    password: string
} 
@injectable()
@registry([{ token: UpdatePasswordUseCase, useClass: UpdatePasswordUseCase }])
export class UpdatePasswordUseCase implements UseCase<TypeParams, IAccount> {
	/**
	 * Construtor da classe.
	 * @param {CacheContract} cache 
	 */
	constructor(
		@inject(Cache) private readonly cache: CacheContract,
        
		@inject(AccountMongoRepository) private readonly manager: ) {
	} // eslint-disable-line

	public async execute({
		id,
		password
	}: TypeParams): PromiseEither<AbstractError, IAccount> {

        const cache = this.cache.get('redefine-password')
        if(!cache) return left(new AbstractError('Link expirado', 400))

		return await this.manager.updatePassword(password, id)
	}
}