import AdminEntity from 'App/Core/domain/entities/user/admin';
import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither } from 'App/Core/shared/either';

export interface AdminManagerInterface {
	findById: (id: string) => PromiseEither<AbstractError, AdminEntity>;
	findByEmail: (email: string) => PromiseEither<AbstractError, AdminEntity>;
	findAll: () => PromiseEither<AbstractError, AdminEntity[]>;
	create: (data: AdminEntity) => PromiseEither<AbstractError, AdminEntity>;
}
