import { AbstractError } from 'App/Core/errors/error.interface';
import { UseCase } from 'App/Core/interfaces/use-case.interface';
import { PromiseEither, right } from 'App/Core/shared';
import Procedure from 'App/Models/Procedure';

type FindAllProps = {
	name?: string;
	active?: boolean;
	unity_id: string;
};

export class FindAllProceduresByUnityUseCase
	implements UseCase<FindAllProps, any[]>
{
	constructor() {}

	public async execute({
		name,
		active = true,
		unity_id,
	}: FindAllProps): PromiseEither<AbstractError, any[]> {
		if (name) {
			const procedures = await Procedure.find({
				name: { $regex: new RegExp(`.*${name}.*`) },
				unity_id: unity_id,
				active,
			})
				.sort('-name')
				.exec();

			return right(procedures);
		}

		const procedures = await Procedure.find({
			unity_id: unity_id,
			active,
		}).exec();

		return right(procedures);
	}
}
