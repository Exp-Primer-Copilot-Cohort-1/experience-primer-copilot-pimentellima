import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither } from 'App/Core/shared/either';
import { IProcedure } from 'Types/IProcedure';

export interface ProceduresManagerInterface {
	findByName: (
		name: string,
		unity_id: string,
	) => PromiseEither<AbstractError, IProcedure[]>;
	findById: (unity_id: string) => PromiseEither<AbstractError, IProcedure[]>;
	deleteById(id: string) => PromiseEither<AbstractError, IProcedure>;
}
