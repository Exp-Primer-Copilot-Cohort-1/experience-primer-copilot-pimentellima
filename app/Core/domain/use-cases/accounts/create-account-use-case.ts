import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { IAccount } from "Types/IAccount";
import AccountEntity from "../../entities/account/account";
import { AccountManagerInterface } from "../../repositories/interface/account-manager-interface";

export class CreateAccountUseCase
	implements UseCase<IAccount, AccountEntity>
{
	constructor(
		private readonly activitiesManager: AccountManagerInterface
	) {}

	public async execute(
		params: IAccount
	): PromiseEither<AbstractError, AccountEntity> {

		const newAccountOrErr =
			await this.activitiesManager.createAccount(params);

		if (newAccountOrErr.isLeft()) return left(newAccountOrErr.extract());
		const newActivity = newAccountOrErr.extract();
		return right(newActivity);
	}
}
