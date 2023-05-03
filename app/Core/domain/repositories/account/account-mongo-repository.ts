import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { IAccount } from "Types/IAccount";
import AccountEntity from "../../entities/account/account";
import { AccountManagerInterface } from "../interface/account-manager-interface";
import { MissingParamsError } from "../../errors/missing-params";
import Account from "App/Models/Account";
import { AccountNotFoundError } from "../../errors/account-not-found-error";
import { InvalidParamsError } from "../../errors/invalid-params-error";

export class AccountMongoRepository implements AccountManagerInterface {
	constructor() {}

    async findAllAccounts(
		unity_id: string
	): PromiseEither<AbstractError, AccountEntity[]> {
		if (!unity_id) return left(new MissingParamsError("unity id"));

		const data = await Account.find({ unity_id });
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
		params: IAccount
	): PromiseEither<AbstractError, AccountEntity> {

		const newAccountOrErr = await AccountEntity.build(params);
		if (newAccountOrErr.isLeft()) return left(newAccountOrErr.extract());
		const newAccount = newAccountOrErr.extract();
		
		const { _id } = await Account.create(newAccount.params());
		newAccount.defineId(_id.toString());
		return right(newAccount);
	}

    async updateAccount(
		params: IAccount
	): PromiseEither<AbstractError, AccountEntity> {
		if (!params._id) return left(new MissingParamsError("id"));
		const oldAccount = await Account.findById(params._id.toString());
		if (!oldAccount) return left(new AccountNotFoundError());
		const newAccountOrErr = await AccountEntity.build({
			...oldAccount.toObject(),
			...params,
		});
		if (newAccountOrErr.isLeft())
			return left(new AbstractError("Invalid params", 400));
		const newAccount = newAccountOrErr.extract();

		await Account.findByIdAndUpdate(params._id, newAccount.params());
		return right(newAccount);
	}
    
    async findAccountById(id: string): PromiseEither<AbstractError, AccountEntity> {
		if (!id) return left(new MissingParamsError("id"));

		const item = await Account.findById(id);
		if (!item) return left(new AccountNotFoundError());

		const accountOrErr = await AccountEntity.build(item.toObject());
		if (accountOrErr.isLeft())
			return left(new InvalidParamsError());

		return right(accountOrErr.extract());
	}

    async deleteAccountById(
		id: string
	): PromiseEither<AbstractError, AccountEntity> {
		if (!id) return left(new MissingParamsError("id"));

		const item = await Account.findByIdAndDelete(id);
		if (!item) return left(new AccountNotFoundError());

		const accountOrErr = await AccountEntity.build(item.toObject());
		if (accountOrErr.isLeft())
			return left(new AbstractError("Invalid params", 400));

		return right(accountOrErr.extract());
	}
}
