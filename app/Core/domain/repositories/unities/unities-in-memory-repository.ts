import { PromiseEither, left, right } from 'App/Core/shared/either';
import { IUnity } from 'Types/IUnity';
import { UnitiesManagerInterface } from '../interface/unities-manager.interface';

export class UnitiesInMemoryRepository implements UnitiesManagerInterface {
	private items: IUnity[] = [];

	constructor() { }
	public async findAll(): PromiseEither<Error, IUnity[]> {
		return right(this.items);
	}

	public async findById(id: string): PromiseEither<Error, IUnity> {
		const unity = this.items.find((item) => item._id === id);

		if (!unity) {
			return left(new Error('Unidade não encontrada'));
		}

		return right(unity);
	}
}
