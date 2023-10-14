import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left } from "App/Core/shared";
import { IAccount } from "App/Types/IAccount";
import { inject, injectable, registry } from "tsyringe";
import { UnityNotFoundError } from "../../errors";
import { AccountMongoRepository } from "../../repositories";
import { AccountManagerInterface } from "../../repositories/interface/account-manager-interface";

type In = {
	unity_id: string
}

@injectable()
@registry([{ token: FindAllAccountUseCase, useClass: FindAllAccountUseCase }])
export class FindAllAccountUseCase
	implements UseCase<In, IAccount[]>
{
	constructor(
		@inject(AccountMongoRepository) private readonly manager: AccountManagerInterface
	) { }

	public async execute(
		{ unity_id }: In
	): PromiseEither<AbstractError, IAccount[]> {
		if (!unity_id) return left(new UnityNotFoundError())

		return await this.manager.findAll(unity_id)
	}
}
