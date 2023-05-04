import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither, left, right } from 'App/Core/shared/either';
import Procedure from 'App/Models/Procedure';
import { IProcedure } from 'Types/IProcedure';
import { UnitNotFoundError } from '../../errors/unit-not-found';
import { ProceduresManagerInterface } from '../interface/procedures-manager.interface';

export class ProceduresMongooseRepository
	implements ProceduresManagerInterface {
	constructor() { }

	async findById(
		unity_id: string,
	): PromiseEither<AbstractError, IProcedure[]> {
		const procedures = await Procedure.find({
			unity_id: unity_id,
		});
		if (!procedures) {
			return left(new UnitNotFoundError());
		}
		return right(procedures);
	}
	public async findByName(
		name: string,
		unity_id: string,
	): PromiseEither<AbstractError, IProcedure[]> {
		const procedure = await Procedure.find({
			name: { $regex: new RegExp(`.*${name}.*`) },
			unity_id: unity_id,
		});
		if (!procedure) {
			return left(new UnitNotFoundError());
		}
		return right(procedure);
	}
}
