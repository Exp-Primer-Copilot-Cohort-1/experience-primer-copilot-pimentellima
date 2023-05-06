import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither } from 'App/Core/shared/either';
import { IForm } from 'Types/IForm';
import FormEntity from '../../entities/form/form';

export interface FormManagerInterface {
	createForm: (params: IForm) => PromiseEither<AbstractError, FormEntity>;
	findAllForms: (unity_id: string) => PromiseEither<AbstractError, FormEntity[]>;
	updateForm: (params: IForm) => PromiseEither<AbstractError, FormEntity>;
	findFormsByProfId : (unity_id: string, prof_id: string) => PromiseEither<AbstractError, FormEntity[]>;
	findFormsByCategoryId: (unity_id: string, category_id: string) => PromiseEither<AbstractError, FormEntity[]>;
	findFormById: (id: string) => PromiseEither<AbstractError, FormEntity>;
	deleteFormById: (id: string) => PromiseEither<AbstractError, FormEntity>;
}
