import FormEntity from 'App/Core/domain/entities/form/form'
import { FormManagerInterface } from 'App/Core/domain/repositories/interface/form-manager-interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import type { IForm } from 'App/Types/IForm'

export class CreateFormUseCase implements UseCase<IForm, FormEntity> {
	constructor(private readonly formManager: FormManagerInterface) { }

	public async execute(params: IForm): PromiseEither<AbstractError, FormEntity> {
		const formOrErr = await this.formManager.createForm(params)

		if (formOrErr.isLeft()) return left(formOrErr.extract())
		const form = formOrErr.extract()
		return right(form)
	}
}
