import { ScheduleManagerContract } from 'App/Core/domain/repositories/interface/schedule-manager-interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'

type Props = {
	prof_id: string
}

type WorkHours = {
	hourStartDay: string
	hourEndDay: string
	hourStartLunch: string
	hourEndLunch: string
}

export class GetWorkHoursUseCase implements UseCase<Props, WorkHours> {
	constructor(private readonly scheduleManager: ScheduleManagerContract) { }

	public async execute(params: Props): PromiseEither<AbstractError, WorkHours> {
		const workHoursOrErr = await this.scheduleManager.getWorkHours(params.prof_id)

		if (workHoursOrErr.isLeft()) return left(workHoursOrErr.extract())
		return right(workHoursOrErr.extract())
	}
}
