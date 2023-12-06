import {
	ActivityMongoRepository,
	ClientsMongooseRepository,
	ProfsMongooseRepository,
} from 'App/Core/domain/repositories';
import {
	ActivitiesManagerContract,
	ClientManagerContract,
	ProfsManagerContract,
} from 'App/Core/domain/repositories/interface';
import { AbstractError } from 'App/Core/errors/error.interface';
import { UseCase } from 'App/Core/interfaces/use-case.interface';
import { PromiseEither, left, right } from 'App/Core/shared';
import Client from 'App/Models/Client';
import SharedAnswer from 'App/Models/SharedAnswer';
import { IFormAnswer, ProfWithAccess } from 'App/Types/IFormAnswer';
import { isBefore, isSameDay } from 'date-fns';
import { Types } from 'mongoose';
import { inject, injectable, registry } from 'tsyringe';
import { ClientNotFoundError, UserNotFoundError } from '../../errors';

type Props = {
	shared_by: string
	shared_with: string
	client_id: string
	start: Date
	end: Date
	unity_id: string
}

@injectable()
@registry([{ token: CreateShareAnswerUseCase, useClass: CreateShareAnswerUseCase }])
export class CreateShareAnswerUseCase implements UseCase<Props, IFormAnswer[]> {
	constructor(
		@inject(ClientsMongooseRepository)
		private readonly clientManager: ClientManagerContract,
		@inject(ProfsMongooseRepository)
		private readonly profManager: ProfsManagerContract,
		@inject(ActivityMongoRepository)
		private readonly activitiesManager: ActivitiesManagerContract,
	) { } // eslint-disable-line

	public async execute(data: Props): PromiseEither<AbstractError, IFormAnswer[]> {
		const clientOrErr = await this.clientManager.findById(data.client_id)
		if (clientOrErr.isLeft()) return left(new ClientNotFoundError())

		const profOrErr = await this.profManager.findById(data.shared_by)
		if (!profOrErr) return left(new UserNotFoundError())

		const client = clientOrErr.extract()
		const formAnswers = client.form_answers
		if (!formAnswers) return left(new AbstractError('', 500))
		const formAnswersWithUpdatedAccessPromises: Promise<IFormAnswer>[] =
			formAnswers?.map(async (formAnswer) => {
				return new Promise(async (resolve, reject) => {
					if (data.start && data.end) {
						const startDate = new Date(data.start)
						const endDate = new Date(data.end)

						const activityOrErr = await this.activitiesManager.find(
							formAnswer.activity_id.toString(),
						)
						if (activityOrErr.isLeft()) return reject()
						const activity = activityOrErr.extract()
						const isSameDate =
							isSameDay(new Date(activity.date), startDate) ||
							(isBefore(new Date(activity.date), startDate) &&
								isBefore(endDate, new Date(activity.date)))
						if (!isSameDate) return resolve(formAnswer)
					}

					const profsWithAccess = formAnswer.profs_with_access || []
					if (profsWithAccess?.map((prof) => prof.id).includes(data.shared_with))
						return resolve(formAnswer)

					const profData = await this.profManager.findById(data.shared_with)
					if (profData.isLeft()) reject()
					const newProfWithAccess: ProfWithAccess = {
						id: data.shared_with,
						name: profData.extract().name,
					}

					const updatedProfsWithAccess = [...profsWithAccess, newProfWithAccess]
					return resolve({
						...formAnswer,
						profs_with_access: updatedProfsWithAccess,
					})
				})
			})
		const formAnswersWithUpdatedAccess = await Promise.all(
			formAnswersWithUpdatedAccessPromises,
		)

		await SharedAnswer.create({
			shared_by: new Types.ObjectId(data.shared_by),
			shared_with: new Types.ObjectId(data.shared_with),
			client: new Types.ObjectId(data.client_id),
			start: data.start,
			end: data.end,
			unity_id: new Types.ObjectId(data.unity_id),
		})

		await Client.findByIdAndUpdate(data.client_id, {
			$set: {
				form_answers: formAnswersWithUpdatedAccess,
			},
		})

		return right(formAnswersWithUpdatedAccess)
	}
}
