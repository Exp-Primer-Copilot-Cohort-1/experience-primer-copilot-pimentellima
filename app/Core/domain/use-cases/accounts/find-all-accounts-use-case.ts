import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left } from "App/Core/shared";
import { IAccount } from "App/Types/IAccount";
import { UnitNotFoundError } from "../../errors";
import { AccountManagerInterface } from "../../repositories/interface/account-manager-interface";

type TypeParams = {
	unity_id: string
}

export class FindAllAccountUseCase
	implements UseCase<TypeParams, IAccount[]>
{
	constructor(
		private readonly manager: AccountManagerInterface
	) { }

	public async execute(
		{ unity_id }: TypeParams
	): PromiseEither<AbstractError, IAccount[]> {
		if (!unity_id) {
			return left(new UnitNotFoundError())
		}

		return await this.manager.findAll(unity_id)
	}
}
