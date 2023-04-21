import { AbstractError } from 'App/Core/errors/error.interface';
import { UseCase } from 'App/Core/interfaces/use-case.interface';
import { PromiseEither, right } from 'App/Core/shared';
import Procedure from 'App/Models/Procedure';

type FindAllProps = {
	name?: string;
	active?: boolean;
};
type Params = {
	unity_id: string;
};

export class FindAllProceduresByUnityUseCase
	implements UseCase<FindAllProps, Params, any[]>
{
	constructor() { }

	public async execute(
		{ name, active = true }: FindAllProps,
		{ unity_id }: Params,
	): PromiseEither<AbstractError, any[]> {
		if (name) {
			const procedures = await Procedure.find({
				name: { $regex: new RegExp(`.*${name}.*`) },
				unity_id: unity_id,
				active,
			}).sort('-name');

			return right(procedures);
		}

		const procedures = await Procedure.where({
			unity_id: unity_id,
			active,
		});

		return right(procedures);
	}
}
