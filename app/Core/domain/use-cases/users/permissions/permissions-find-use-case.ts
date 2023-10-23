import { IdNotProvidedError } from "App/Core/domain/errors";
import { PermissionMongoRepository } from "App/Core/domain/repositories";
import { PermissionManagerContract } from "App/Core/domain/repositories/users/permission-manager.interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left } from "App/Core/shared";
import { IPermission } from "App/Types/IPermission";
import { inject, injectable, registry } from "tsyringe";

type In = { id: string }

@injectable()
@registry([{ token: PermissionsFindUseCase, useClass: PermissionsFindUseCase }])
export class PermissionsFindUseCase
	implements UseCase<In, IPermission>
{
	constructor(
		@inject(PermissionMongoRepository) private readonly manager: PermissionManagerContract
	) { }

	public async execute({ id }: In): PromiseEither<AbstractError, IPermission> {
		if (!id) return left(new IdNotProvidedError())

		return await this.manager.find(id)
	}
}
