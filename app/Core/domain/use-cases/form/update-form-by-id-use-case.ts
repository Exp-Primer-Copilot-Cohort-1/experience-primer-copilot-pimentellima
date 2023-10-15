import FormEntity from 'App/Core/domain/entities/form/form'
import { FormManagerInterface } from 'App/Core/domain/repositories/interface/form-manager-interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IForm } from 'App/Types/IForm'

type TypeParams = {
	form: IForm
	id: string
}

export class UpdateFormByIdUseCase implements UseCase<TypeParams, FormEntity> {
	constructor(private readonly formManager: FormManagerInterface) { } // eslint-disable-line

	public async execute(params: TypeParams): PromiseEither<AbstractError, FormEntity> {
		const formOrErr = await this.formManager.updateFormById(params.form, params.id)

		if (formOrErr.isLeft()) return left(formOrErr.extract())
		const form = formOrErr.extract()
		return right(form)
	}
}
