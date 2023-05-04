import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither } from 'App/Core/shared/either';
import { IAccount } from 'Types/IAccount';
import AccountEntity from '../../entities/account/account';

export interface AccountManagerInterface {
	findAllAccounts: (unity_id: string) => PromiseEither<AbstractError, AccountEntity[]>;
    createAccount: (params: IAccount) => PromiseEither<AbstractError, AccountEntity>;
    updateAccount: (params: IAccount) => PromiseEither<AbstractError, AccountEntity>;
    findAccountById: (id: string) => PromiseEither<AbstractError, AccountEntity>;
    deleteAccountById: (id: string) => PromiseEither<AbstractError, AccountEntity>;
}
