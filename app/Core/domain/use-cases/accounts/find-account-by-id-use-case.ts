import { AccountMongoRepository } from "App/Core/domain/repositories";
import { AccountManagerInterface } from "App/Core/domain/repositories/account/account-manager.interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left } from "App/Core/shared";
import { IAccount } from "App/Types/IAccount";
import { inject, injectable, registry } from "tsyringe";

type TypeParams = {
	id: string
}

@injectable()
@registry([{ token: FindAccountByIdUseCase, useClass: FindAccountByIdUseCase }])
export class FindAccountByIdUseCase
	implements UseCase<TypeParams, IAccount>
{
	constructor(
		@inject(AccountMongoRepository) private readonly manager: AccountManagerInterface
	) { }

	public async execute(
		{ id }: TypeParams
	): PromiseEither<AbstractError, IAccount> {
		if (!id) return left(new AbstractError('id is required', 404));

		return await this.manager.findByID(id);
	}
}
