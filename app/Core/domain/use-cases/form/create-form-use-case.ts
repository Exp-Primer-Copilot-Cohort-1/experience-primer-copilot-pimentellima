import FormEntity from 'App/Core/domain/entities/form/form'
import { FormMongoRepository } from 'App/Core/domain/repositories/form/form-mongo-repository'
import { FormManagerContract } from 'App/Core/domain/repositories/interface/form-manager-interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import type { IForm } from 'App/Types/IForm'
import { inject, injectable, registry } from 'tsyringe'

@injectable()
@registry([{ token: CreateFormUseCase, useClass: CreateFormUseCase }])
export class CreateFormUseCase implements UseCase<IForm, FormEntity> {
	constructor(@inject(FormMongoRepository) private readonly manager: FormManagerContract) { }

	public async execute(params: IForm): PromiseEither<AbstractError, FormEntity> {
		const formOrErr = await this.manager.create(params)

		if (formOrErr.isLeft()) return left(formOrErr.extract())
		const form = formOrErr.extract()
		return right(form)
	}
}
