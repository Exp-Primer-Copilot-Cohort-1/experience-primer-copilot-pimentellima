import { PromiseEither } from 'App/Core/shared/either';
import { IUnity } from 'Types/IUnity';

export interface UnitiesManagerInterface {
	findById: (id: string) => PromiseEither<Error, IUnity>;
}
