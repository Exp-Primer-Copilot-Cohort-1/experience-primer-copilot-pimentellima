import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { IAccount } from "Types/IAccount";
import AccountEntity from "../../entities/account/account";
import { AccountManagerInterface } from "../interface/account-manager-interface";
import { MissingParamsError } from "../../errors/missing-params";
import { AccountNotFoundError } from "../../errors/account-not-found-error";
import { InvalidParamsError } from "../../errors/invalid-params-error";

export class AccountInMemoryRepository implements AccountManagerInterface {
    public accounts: any[] = [];

	constructor() {}

    async findAllAccounts(
		unity_id: string
	): PromiseEither<AbstractError, AccountEntity[]> {
		if (!unity_id) return left(new MissingParamsError("unity id"));

		const data = this.accounts.filter((acc) => acc.unity_id === unity_id);
		const accounts = await Promise.all(
			data.map(async (item) => {
				const accountOrErr = await AccountEntity.build(item);
				if (accountOrErr.isLeft()) {
					return {} as AccountEntity;
				}
				return accountOrErr.extract();
			})
		);
		return right(accounts);
	}

    async createAccount(
		account: IAccount
	): PromiseEither<AbstractError, AccountEntity> {

		const newAccountOrErr = await AccountEntity.build(account);
		if (newAccountOrErr.isLeft()) return left(newAccountOrErr.extract());
		const newAccount = newAccountOrErr.extract();
		return right(newAccount);
	}

    async updateAccountById(
		account: IAccount,
		id: string
	): PromiseEither<AbstractError, AccountEntity> {
		if (!id) return left(new MissingParamsError("id"));
		const oldAccount = this.accounts.find(acc => acc._id === id);
		if (!oldAccount) return left(new AccountNotFoundError());
		const newAccountOrErr = await AccountEntity.build({
			...oldAccount,
			...account,
		});
		if (newAccountOrErr.isLeft())
			return left(new AbstractError("Invalid params", 400));
		const newAccount = newAccountOrErr.extract();

		return right(newAccount);
	}
    
    async findAccountById(id: string): PromiseEither<AbstractError, AccountEntity> {
		if (!id) return left(new MissingParamsError("id"));

		const item = this.accounts.find(acc => acc._id === id);
		if (!item) return left(new AccountNotFoundError());

		const accountOrErr = await AccountEntity.build(item);
		if (accountOrErr.isLeft())
			return left(new InvalidParamsError());

		return right(accountOrErr.extract());
	}

    deleteAccountById : (
		id: string
	) => PromiseEither<AbstractError, AccountEntity>;
}
