import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither, left, right } from 'App/Core/shared';
import { IProcedure } from 'Types/IProcedure';
import { UnitNotFoundError } from '../../errors/unit-not-found';
import { ProceduresManagerInterface } from '../interface';

export class ProceduresInMemoryRepository
	implements ProceduresManagerInterface {
	private items: IProcedure[] = [
		{ name: 'name', unity_id: 'unity_id', _id: 'idtest' },
		{ name: 'name2', unity_id: 'unity_id', _id: 'idtest2' },
		{ name: 'name3', unity_id: 'unity_id', _id: 'idtest3' },
	];

	deleteById(id: string): PromiseEither<AbstractError, IProcedure> {
		throw new Error('Method not implemented.');
	}
	constructor() { }
	public async findByName(
		name: string,
		unity_id: string,
	): PromiseEither<AbstractError, IProcedure[]> {
		return right(this.items);
	}

	public async findById(
		unity_id: string,
	): PromiseEither<AbstractError, IProcedure[]> {
		const procedure = this.items.find(
			(item) => item.unity_id.toString() === unity_id,
		);

		if (!procedure) {
			return left(new UnitNotFoundError());
		}

		return right(procedure);
	}
	public async deleteById(
		id: string,
	): PromiseEither<AbstractError, IProcedures> {
		const procedure = this.items.find((item) => item._id === id);

		if (!procedure) {
			return left(new UnitNotFoundError());
		}

		return right(procedure);
	}
}
