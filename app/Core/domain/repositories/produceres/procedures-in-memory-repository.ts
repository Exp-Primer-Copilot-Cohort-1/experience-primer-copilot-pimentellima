import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither, left, right } from 'App/Core/shared';
import { IProcedure } from 'Types/IProcedure';
import { UnitNotFoundError } from '../../errors/unit-not-found';
import { ProceduresManagerInterface } from '../interface';

export class ProceduresInMemoryRepository
	implements ProceduresManagerInterface {
	private items: IProcedure[] = [];

	constructor() { }
	public async findByName(
		name: string,
		unity_id: string,
	): PromiseEither<AbstractError, IProcedure[]> {
		return right(this.items);
	}

	public async findById(
		unity_id: string,
	): PromiseEither<AbstractError, IProcedure> {
		const procedure = this.items.find((item) => item.unity_id === unity_id);

		if (!procedure) {
			return left(new UnitNotFoundError());
		}
	}
}
