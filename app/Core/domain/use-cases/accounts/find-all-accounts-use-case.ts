import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import AccountEntity from "../../entities/account/account";
import { AccountManagerInterface } from "../../repositories/interface/account-manager-interface";

type TypeParams = {
	unity_id: string
}

export class FindAllAccountUseCase
	implements UseCase<TypeParams, AccountEntity[]>
{
	constructor(
		private readonly activitiesManager: AccountManagerInterface
	) {}

	public async execute(
		params: TypeParams
	): PromiseEither<AbstractError, AccountEntity[]> {

		const accountsOrErr =
			await this.activitiesManager.findAllAccounts(params.unity_id);

		if (accountsOrErr.isLeft()) return left(accountsOrErr.extract());
		const accounts = accountsOrErr.extract();
		return right(accounts);
	}
}
