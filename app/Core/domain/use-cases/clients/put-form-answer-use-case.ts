import { ClientsMongooseRepository } from 'App/Core/domain/repositories'
import { ClientManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import type { IUserClient } from 'App/Types/IClient'
import { IFormAnswer } from 'App/Types/IFormAnswer'
import { inject, injectable, registry } from 'tsyringe'

type Data = {
	field_answers: { question: string; answer: string }[]
	form: { name: string; id: string }
	activity_id: string
	prof: { value: string; label: string }
	client_id: string
}

@injectable()
@registry([{ token: PutFormAnswerUseCase, useClass: PutFormAnswerUseCase }])
export class PutFormAnswerUseCase implements UseCase<Data, IUserClient> {
	constructor(
		@inject(ClientsMongooseRepository)
		private readonly manager: ClientManagerContract,
	) {} // eslint-disable-line

	public async execute({
		field_answers,
		form,
		activity_id,
		prof,
		client_id,
	}: Data): PromiseEither<AbstractError, IUserClient> {
		const form_answer: IFormAnswer = {
			form,
			field_answers,
			activity_id,
			prof,
		}

		return await this.manager.pushFormAnswer(client_id, form_answer)
	}
}
