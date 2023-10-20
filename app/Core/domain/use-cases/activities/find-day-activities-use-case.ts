import { ActivitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { AppointmentStatus } from 'App/Helpers'
import { Client, IActivity } from 'App/Types/IActivity'
import { isAfter, isToday } from 'date-fns'

type ActivityProps = {
	unity_id: string
	prof_id: string
}

export class FindDayActivitiesUseCase implements UseCase<ActivityProps, IActivity[]> {
	constructor(private readonly activitiesManager: ActivitiesManagerInterface) { }

	public async execute({
		unity_id,
		prof_id,
	}: ActivityProps): PromiseEither<AbstractError, IActivity[]> {
		const activitiesByProfOrErr = await this.activitiesManager.findByProf(
			unity_id,
			prof_id,
		)
		if (activitiesByProfOrErr.isLeft()) return left(activitiesByProfOrErr.extract())
		const dayActivities = activitiesByProfOrErr
			.extract()
			.filter(
				({ scheduled, date }) =>
					scheduled !== undefined &&
					[
						AppointmentStatus.SCHEDULED,
						AppointmentStatus.RESCHEDULED,
						AppointmentStatus.AWAITING,
					].includes(scheduled) &&
					isToday(new Date(date)),
			).sort((a, b) => (isAfter(new Date(a.date), new Date(b.date)) ? 1 : -1))

		const clients = {}
		const activities: (IActivity & { isFirstFromClient: boolean })[] = []

		await Promise.all(
			dayActivities.map(async (activity) => {
				const activityObject = (activity as any).toObject() as IActivity
				const clientId = (activityObject.client as Client).value
				if (clients[clientId] === 1) {
					activities.push({
						...activityObject,
						isFirstFromClient: true,
					})
				}
				if (clients[clientId] === 0) {
					activities.push({
						...activityObject,
						isFirstFromClient: false,
					})
				}
				const clientActivities =
					await this.activitiesManager.findByClient(
						unity_id,
						clientId,
					)

				if (clientActivities.isLeft()) return left(clientActivities.extract())
				if (clientActivities.extract().length === 1) {
					clients[clientId] = 1
					activities.push({
						...activityObject,
						isFirstFromClient: true,
					})
				} else {
					clients[clientId] = 0
					activities.push({
						...activityObject,
						isFirstFromClient: false,
					})
				}
			}),
		)

		return right(activities)
	}
}
