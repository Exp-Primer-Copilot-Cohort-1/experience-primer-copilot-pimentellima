import { UnityNotFoundError } from "App/Core/domain/errors";
import { AccountMongoRepository } from "App/Core/domain/repositories";
import { ICount } from "App/Core/domain/repositories/helpers/count";
import { AccountManagerInterface } from "App/Core/domain/repositories/interface/account-manager-interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left } from "App/Core/shared";
import { inject, injectable, registry } from "tsyringe";

type In = {
	unity_id: string
}

@injectable()
@registry([{ token: CountAccountsUseCase, useClass: CountAccountsUseCase }])
export class CountAccountsUseCase
	implements UseCase<In, ICount>
{
	constructor(
		@inject(AccountMongoRepository) private readonly manager: AccountManagerInterface
	) { }

	public async execute(
		{ unity_id }: In
	): PromiseEither<AbstractError, ICount> {
		if (!unity_id) return left(new UnityNotFoundError())

		return await this.manager.getCount(unity_id)
	}
}
