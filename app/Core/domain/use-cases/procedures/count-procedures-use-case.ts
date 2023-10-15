import { UnityIdNotProvidedError } from "App/Core/domain/errors";
import { ProceduresMongooseRepository } from "App/Core/domain/repositories";
import { ICount } from "App/Core/domain/repositories/helpers/count";
import { ProceduresManagerInterface } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left } from "App/Core/shared";
import { inject, injectable, registry } from "tsyringe";

type In = {
	unity_id: string
}

@injectable()
@registry([{ token: CountProceduresUseCase, useClass: CountProceduresUseCase }])
export class CountProceduresUseCase
	implements UseCase<In, ICount>
{
	constructor(
		@inject(ProceduresMongooseRepository) private readonly manager: ProceduresManagerInterface
	) { }

	public async execute(
		{ unity_id }: In
	): PromiseEither<AbstractError, ICount> {
		if (!unity_id) return left(new UnityIdNotProvidedError())

		return await this.manager.getCount(unity_id)
	}
}
