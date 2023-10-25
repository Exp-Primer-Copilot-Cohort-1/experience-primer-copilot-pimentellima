import FormEntity from 'App/Core/domain/entities/form/form'
import { IdNotProvidedError } from 'App/Core/domain/errors/id-not-provided'
import { FormManagerContract } from 'App/Core/domain/repositories/interface/form-manager-interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'

type TypeParams = {
	id: string
}

export class DeleteFormByIdUseCase implements UseCase<TypeParams, FormEntity> {
	constructor(private readonly formManager: FormManagerContract) { } // eslint-disable-line


	public async execute({ id }): PromiseEither<AbstractError, FormEntity> {
		if (!id) return left(new IdNotProvidedError())
		const formOrErr = await this.formManager.deleteFormById(id)

		if (formOrErr.isLeft()) return left(formOrErr.extract())
		const form = formOrErr.extract()
		return right(form)
	}
}
