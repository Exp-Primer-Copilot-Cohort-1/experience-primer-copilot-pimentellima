import { PromiseEither, left, right } from 'App/Core/shared/either';
import Unity from 'App/Models/Unity';
import { IUnity } from 'Types/IUnity';
import { UnitiesManagerInterface } from '../interface/unities-manager.interface';

export class UnitiesMongooseRepository implements UnitiesManagerInterface {
	constructor() { }
	public findAll(): PromiseEither<Error, IUnity[]> {
		throw new Error('Method not implemented.');
	}
	public findById(id: string): PromiseEither<Error, IUnity> {
		return new Promise((resolve) => {
			Unity.findById(id)
				.then((unity) => {
					if (!unity) {
						return resolve(
							left(new Error('Unidade não encontrada')),
						);
					}
					return resolve(right(unity));
				})
				.catch((error) => {
					return resolve(left(new Error(error.message)));
				});
		});
	}
}
