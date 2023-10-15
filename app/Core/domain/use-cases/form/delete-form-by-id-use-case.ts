import FormEntity from 'App/Core/domain/entities/form/form'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { FormManagerInterface } from '../../repositories/interface/form-manager-interface'

type TypeParams = {
	id: string
}

export class DeleteFormByIdUseCase implements UseCase<TypeParams, FormEntity> {
	constructor(private readonly formManager: FormManagerInterface) { } // eslint-disable-line

	public async execute(params: TypeParams): PromiseEither<AbstractError, FormEntity> {
		const formOrErr = await this.formManager.deleteFormById(params.id)

		if (formOrErr.isLeft()) return left(formOrErr.extract())
		const form = formOrErr.extract()
		return right(form)
	}
}
