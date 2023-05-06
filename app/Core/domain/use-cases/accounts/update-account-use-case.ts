import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import AccountEntity from "../../entities/account/account";
import { AccountManagerInterface } from "../../repositories/interface/account-manager-interface";
import { IAccount } from "Types/IAccount";

export class UpdateAccountUseCase
	implements UseCase<IAccount, AccountEntity>
{
	constructor(
		private readonly accountManager: AccountManagerInterface
	) {}

	public async execute(
		params: IAccount
	): PromiseEither<AbstractError, AccountEntity> {

		const accountOrErr =
			await this.accountManager.updateAccount(params);

		if (accountOrErr.isLeft()) return left(accountOrErr.extract());
		const account = accountOrErr.extract();
		return right(account);
	}
}
