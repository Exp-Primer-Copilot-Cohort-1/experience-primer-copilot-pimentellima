import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IScheduleBlock, ScheduleBlockParams } from 'App/Types/IScheduleBlock'
import { ScheduleBlockManagerInterface } from '../../repositories/interface/schedule-block-manager-interface'

type Props = ScheduleBlockParams & {
	unity_id: string
}

export class CreateScheduleBlockUseCase implements UseCase<Props, IScheduleBlock> {
	constructor(private readonly scheduleBlockManager: ScheduleBlockManagerInterface) { }

	public async execute(params: Props): PromiseEither<AbstractError, IScheduleBlock> {
		const newScheduleBlockOrErr = await this.scheduleBlockManager.createScheduleBlock(
			params.unity_id,
			params,
		)

		if (newScheduleBlockOrErr.isLeft()) return left(newScheduleBlockOrErr.extract())
		return right(newScheduleBlockOrErr.extract())
	}
}
