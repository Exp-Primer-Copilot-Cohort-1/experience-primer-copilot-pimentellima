import FormEntity from 'App/Core/domain/entities/form/form'
import { FormManagerInterface } from 'App/Core/domain/repositories/interface/form-manager-interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IForm } from 'App/Types/IForm'
import { inject, injectable, registry } from 'tsyringe'
import { IdNotProvidedError } from '../../errors/id-not-provided'
import { FormMongoRepository } from '../../repositories/form/form-mongo-repository'

type TypeParams = {
	form: IForm
	id: string
}

@injectable()
@registry([{ token: UpdateFormByIdUseCase, useClass: UpdateFormByIdUseCase }])
export class UpdateFormByIdUseCase implements UseCase<TypeParams, FormEntity> {
	constructor(@inject(FormMongoRepository) private readonly manager: FormManagerInterface) { } // eslint-disable-line

	public async execute(params: TypeParams): PromiseEither<AbstractError, FormEntity> {
		if (!params.id) return left(new IdNotProvidedError())
		const formOrErr = await this.manager.update(params.form, params.id)

		if (formOrErr.isLeft()) return left(formOrErr.extract())
		const form = formOrErr.extract()
		return right(form)
	}
}
