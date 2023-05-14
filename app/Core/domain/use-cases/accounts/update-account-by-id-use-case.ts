import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import AccountEntity from "../../entities/account/account";
import { AccountManagerInterface } from "../../repositories/interface/account-manager-interface";
import { IAccount } from "Types/IAccount";

type TypeParams = {
	account: IAccount;
	id: string;
};

export class UpdateAccountByIdUseCase
	implements UseCase<TypeParams, AccountEntity>
{
	constructor(private readonly accountManager: AccountManagerInterface) {}

	public async execute(
		params: TypeParams
	): PromiseEither<AbstractError, AccountEntity> {
		const accountOrErr = await this.accountManager.updateAccountById(
			params.account,
			params.id
		);

		if (accountOrErr.isLeft()) return left(accountOrErr.extract());
		const account = accountOrErr.extract();
		return right(account);
	}
}
