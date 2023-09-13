import LogDecorator from 'App/Core/decorators/log-decorator'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IForm } from 'App/Types/IForm'
import FormEntity from '../../entities/form/form'
import { FormManagerInterface } from '../../repositories/interface/form-manager-interface'

type TypeParams = {
	form: IForm
	id: string
}

export class UpdateFormByIdUseCase implements UseCase<TypeParams, FormEntity> {
	constructor(private readonly formManager: FormManagerInterface) { }

	@LogDecorator('forms', 'put')
	public async execute(params: TypeParams): PromiseEither<AbstractError, FormEntity> {
		const formOrErr = await this.formManager.updateFormById(params.form, params.id)

		if (formOrErr.isLeft()) return left(formOrErr.extract())
		const form = formOrErr.extract()
		return right(form)
	}
}
