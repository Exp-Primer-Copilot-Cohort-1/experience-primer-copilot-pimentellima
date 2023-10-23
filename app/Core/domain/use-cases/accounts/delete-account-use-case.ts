import { AccountMongoRepository } from 'App/Core/domain/repositories';
import { AccountManagerContract } from "App/Core/domain/repositories/account/account-manager.interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left } from "App/Core/shared";
import { IAccount } from "App/Types/IAccount";
import { inject, injectable, registry } from "tsyringe";
import { IdNotProvidedError } from '../../errors/id-not-provided';

type TypeParams = {
	id: string
}

@injectable()
@registry([{ token: DeleteAccountByIdUseCase, useClass: DeleteAccountByIdUseCase }])
export class DeleteAccountByIdUseCase
	implements UseCase<TypeParams, IAccount>
{
	constructor(
		@inject(AccountMongoRepository) private readonly manager: AccountManagerContract
	) { }

	public async execute(
		{ id }: TypeParams
	): PromiseEither<AbstractError, IAccount> {
		if (!id) return left(new IdNotProvidedError())

		return await this.manager.deleteById(id);;
	}
}
