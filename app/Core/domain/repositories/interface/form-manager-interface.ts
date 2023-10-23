import FormEntity from 'App/Core/domain/entities/form/form';
import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither } from 'App/Core/shared/either';
import { IForm } from 'App/Types/IForm';

export interface FormManagerContract {
	create: (form: IForm) => PromiseEither<AbstractError, FormEntity>;
	findAll: (unity_id: string) => PromiseEither<AbstractError, FormEntity[]>;
	update: (form: IForm, id: string) => PromiseEither<AbstractError, FormEntity>;
	findFormsByProfId: (unity_id: string, prof_id: string) => PromiseEither<AbstractError, FormEntity[]>;
	findFormsByCategoryId: (unity_id: string, category_id: string) => PromiseEither<AbstractError, FormEntity[]>;
	findById: (id: string) => PromiseEither<AbstractError, FormEntity>;
	deleteFormById: (id: string) => PromiseEither<AbstractError, FormEntity>;
}
