import { MissingParamsError } from 'App/Core/domain/errors/missing-params';
import { UnitiesManagerContract } from 'App/Core/domain/repositories/interface';
import { AbstractError } from 'App/Core/errors/error.interface';
import { UseCase } from 'App/Core/interfaces/use-case.interface';
import { PromiseEither, left } from 'App/Core/shared';
import { inject, injectable, registry } from 'tsyringe';
import { UnitiesMongooseRepository } from '../../repositories';

type Input = {
	id: string;
};

@injectable()
@registry([{ token: ShowUnityByIdUseCase, useClass: ShowUnityByIdUseCase }])
export class ShowUnityByIdUseCase implements UseCase<Input, any> {
	constructor(@inject(UnitiesMongooseRepository) private readonly manager: UnitiesManagerContract) { }

	public async execute({ id }): PromiseEither<AbstractError, any> {
		if (!id) {
			return left(new MissingParamsError('id'));
		}

		const unitiesOrErr = await this.manager.findById(id);

		if (unitiesOrErr.isLeft()) {
			return left(unitiesOrErr.extract());
		}

		return unitiesOrErr;
	}
}
