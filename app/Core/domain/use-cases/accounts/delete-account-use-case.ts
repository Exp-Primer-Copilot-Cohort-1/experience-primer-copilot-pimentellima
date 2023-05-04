import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import AccountEntity from "../../entities/account/account";
import { AccountManagerInterface } from "../../repositories/interface/account-manager-interface";

type TypeParams = {
	id: string
}

export class DeleteAccountByIdUseCase
	implements UseCase<TypeParams, AccountEntity>
{
	constructor(
		private readonly activitiesManager: AccountManagerInterface
	) {}

	public async execute(
		params: TypeParams
	): PromiseEither<AbstractError, AccountEntity> {

		const accountOrErr =
			await this.activitiesManager.deleteAccountById(params.id);

		if (accountOrErr.isLeft()) return left(accountOrErr.extract());
		const account = accountOrErr.extract();
		return right(account);
	}
}
