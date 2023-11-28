import { ProfsMongooseRepository } from "App/Core/domain/repositories";
import { ProfsManagerContract } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither } from "App/Core/shared";
import { IProf } from "App/Types/IProf";
import { inject, injectable, registry } from "tsyringe";

type In = IProf & { id: string }

@injectable()
@registry([{ token: UpdateUsers, useClass: UpdateUsers }])
export class UpdateUsers
	implements UseCase<In, IProf>
{
	constructor(
		@inject(ProfsMongooseRepository) private readonly manager: ProfsManagerContract
	) { }

	public async execute({
		id,
		...data
	}: In): PromiseEither<AbstractError, IProf> {
		return await this.manager.update(id, data)
	}
}
