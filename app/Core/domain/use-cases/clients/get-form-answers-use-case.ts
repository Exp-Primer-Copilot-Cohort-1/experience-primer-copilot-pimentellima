import { ClientsMongooseRepository } from 'App/Core/domain/repositories'
import { ClientManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IFormAnswer } from 'App/Types/IFormAnswer'
import { inject, injectable, registry } from 'tsyringe'

type In = {
	client_id: string,
    prof_id: string
}

@injectable()
@registry([{ token: GetFormAnswersUseCase, useClass: GetFormAnswersUseCase }])
export class GetFormAnswersUseCase implements UseCase<In, IFormAnswer[] | undefined> {
	constructor(
		@inject(ClientsMongooseRepository)
		private readonly manager: ClientManagerContract,
	) {}

	public async execute({
		client_id,
        prof_id
	}: In): PromiseEither<AbstractError, IFormAnswer[] | undefined> {
		const clientOrErr = await this.manager.findById(client_id)
		if (clientOrErr.isLeft()) return left(clientOrErr.extract())
		const { form_answers } = clientOrErr.extract()
        const answers = form_answers?.filter((ans) => {
            if (ans.prof.value === prof_id) {
                return true
            }
            if (
                ans.profs_with_access?.map((p) => p.id)?.includes(prof_id)
            ) {
                return true
            } else return false
        })

		return right(answers)
	}
}
