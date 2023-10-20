import { CategoriesMongooseRepository } from "App/Core/domain/repositories";
import { CategoriesManagerInterface } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither } from "App/Core/shared";
import { ICategory } from "App/Types/ICategory";
import { inject, injectable, registry } from "tsyringe";

type In = never

@injectable()
@registry([{ token: FindAllCategoriesUseCase, useClass: FindAllCategoriesUseCase }])
export class FindAllCategoriesUseCase
	implements UseCase<In, ICategory[]>
{
	constructor(
		@inject(CategoriesMongooseRepository) private readonly manager: CategoriesManagerInterface
	) { }

	public async execute(): PromiseEither<AbstractError, ICategory[]> {
		return await this.manager.findAll()
	}
}
