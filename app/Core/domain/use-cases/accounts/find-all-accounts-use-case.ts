import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither } from "App/Core/shared";
import { IAccount } from "App/Types/IAccount";
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
		params: TypeParams
	): PromiseEither<AbstractError, IAccount[]> {
		return await this.manager.findAll(params.unity_id)
	}
}
