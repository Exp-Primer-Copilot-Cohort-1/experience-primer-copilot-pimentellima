import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import AccountEntity from "../../entities/account/account";
import { AccountManagerInterface } from "../../repositories/interface/account-manager-interface";

export class FindAllAccountUseCase
	implements UseCase<string, AccountEntity[]>
{
	constructor(
		private readonly activitiesManager: AccountManagerInterface
	) {}

	public async execute(
		unity_id: string
	): PromiseEither<AbstractError, AccountEntity[]> {

		const accountsOrErr =
			await this.activitiesManager.findAllAccounts(unity_id);

		if (accountsOrErr.isLeft()) return left(accountsOrErr.extract());
		const accounts = accountsOrErr.extract();
		return right(accounts);
	}
}
