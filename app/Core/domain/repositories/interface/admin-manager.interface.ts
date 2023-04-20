import AdminEntity from 'App/Core/domain/entities/user/admin';
import { PromiseEither } from 'App/Core/shared/either';

export interface AdminManagerInterface {
	findById: (id: string) => PromiseEither<Error, AdminEntity>;
	findByEmail: (email: string) => PromiseEither<Error, AdminEntity>;
	findAll: () => PromiseEither<Error, AdminEntity[]>;
	create: (data: AdminEntity) => PromiseEither<Error, AdminEntity>;
}
