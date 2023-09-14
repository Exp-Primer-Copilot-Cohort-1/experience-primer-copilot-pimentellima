import LogDecorator from 'App/Core/decorators/log-decorator'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import type { IForm } from 'App/Types/IForm'
import FormEntity from '../../entities/form/form'
import { FormManagerInterface } from '../../repositories/interface/form-manager-interface'

export class CreateFormUseCase implements UseCase<IForm, FormEntity> {
	constructor(private readonly formManager: FormManagerInterface) { }

	@LogDecorator('forms', 'post')
	public async execute(params: IForm): PromiseEither<AbstractError, FormEntity> {
		const formOrErr = await this.formManager.createForm(params)

		if (formOrErr.isLeft()) return left(formOrErr.extract())
		const form = formOrErr.extract()
		return right(form)
	}
}
