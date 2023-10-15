import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left } from "App/Core/shared";
import { IAccount } from "App/Types/IAccount";
import { inject, injectable, registry } from "tsyringe";
import { MissingParamsError } from "../../errors";
import { AccountMongoRepository } from '../../repositories';
import { AccountManagerInterface } from "../../repositories/account/account-manager.interface";

type TypeParams = {
	id: string
}

@injectable()
@registry([{ token: DeleteAccountByIdUseCase, useClass: DeleteAccountByIdUseCase }])
export class DeleteAccountByIdUseCase
	implements UseCase<TypeParams, IAccount>
{
	constructor(
		@inject(AccountMongoRepository) private readonly accountManager?: AccountManagerInterface
	) { }

	public async execute(
		{ id }: TypeParams
	): PromiseEither<AbstractError, IAccount> {
		if (!id) return left(new MissingParamsError('id'))

		return await (this.accountManager as AccountManagerInterface).deleteByID(id);;
	}
}
