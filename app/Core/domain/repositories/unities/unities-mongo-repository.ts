import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither, left, right } from 'App/Core/shared/either';
import Unity from 'App/Models/Unity';
import { IUnity } from 'Types/IUnity';
import { UnitNotFoundError } from '../../errors/unit-not-found';
import { UnitiesManagerInterface } from '../interface/unities-manager.interface';

export class UnitiesMongooseRepository implements UnitiesManagerInterface {
	constructor() { }
	public findAll(): PromiseEither<AbstractError, IUnity[]> {
		throw new Error('Method not implemented.');
	}
	public async findById(id: string): PromiseEither<AbstractError, IUnity> {
		const unity = await Unity.findById(id);
		if (!unity) {
			return left(new UnitNotFoundError());
		}
		return right(unity);
	}
}
