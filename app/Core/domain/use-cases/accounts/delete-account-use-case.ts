import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left } from "App/Core/shared";
import { IAccount } from "App/Types/IAccount";
import { AccountManagerInterface } from "../../repositories/interface/account-manager-interface";

type TypeParams = {
	id: string
}

export class DeleteAccountByIdUseCase
	implements UseCase<TypeParams, IAccount>
{
	constructor(
		private readonly accountManager: AccountManagerInterface
	) { }

	public async execute(
		{ id }: TypeParams
	): PromiseEither<AbstractError, IAccount> {
		if (!id) return left(new AbstractError("Id is required", 404));

		return await this.accountManager.deleteByID(id);;
	}
}
