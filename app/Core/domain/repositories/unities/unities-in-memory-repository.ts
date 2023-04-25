import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither, left, right } from 'App/Core/shared/either';
import { IUnity } from 'Types/IUnity';
import { UnitiesManagerInterface } from '../interface/unities-manager.interface';

export class UnitiesInMemoryRepository implements UnitiesManagerInterface {
	private items: IUnity[] = [];

	constructor() { }
	findByName: (name: string) => PromiseEither<AbstractError, IUnity[]>;
	public async findAll(): PromiseEither<AbstractError, IUnity[]> {
		return right(this.items);
	}

	public async findById(id: string): PromiseEither<AbstractError, IUnity> {
		const unity = this.items.find((item) => item._id === id);

		if (!unity) {
			return left(new AbstractError('Unidade não encontrada', 404));
		}

		return right(unity);
	}
}
