import { UnitNotFoundError } from 'App/Core/domain/errors/unit-not-found'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'

import {
	CensusClientsManagerInterface,
	CensusUnitiesManagerInterface,
} from 'App/Core/domain/repositories/interface'
import { ICensusCount } from '../../helpers/census'

type PopulationCensusByDateProps = {
	unity_id: string
	date_start?: string
	date_end?: string
	prof_id?: string
}

export class PopulationCensusByDateUseCase
	implements UseCase<PopulationCensusByDateProps, ICensusCount>
{
	constructor(
		private readonly manager: CensusUnitiesManagerInterface,
		private readonly managerClients: CensusClientsManagerInterface,
	) { }

	public async execute({
		unity_id,
		date_start,
		date_end,
		prof_id,
	}: PopulationCensusByDateProps): PromiseEither<AbstractError, ICensusCount> {
		if (!unity_id) {
			return left(new UnitNotFoundError())
		}

		if (!date_start) {
			// Set date_start as the first day of the current month
			const now = new Date()
			date_start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
		}

		if (!date_end) {
			// Set date_end as the last day of the current month
			const now = new Date()
			date_end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString()
		}

		const [
			scheduled_eventsOrErr,
			health_insurancesOrErr,
			partnersOrErr,
			proceduresOrErr,
			gender_clientOrErr,
			media_time_attendanceOrErr,
			new_and_old_clientsOrErr,
		] = await Promise.all([
			this.manager.findCensusActivitiesOfScheduledByUnityOrProf(
				unity_id,
				date_start,
				date_end,
				prof_id,
			),
			this.manager.findCensusHealthInsurancesByUnityOrProf(
				unity_id,
				date_start,
				date_end,
				prof_id,
			),
			this.managerClients.findCensusPartnersByUnityOrProf(
				unity_id,
				date_start,
				date_end,
				prof_id,
			),
			this.manager.findCensusProcedureByUnityOrProf(
				unity_id,
				date_start,
				date_end,
				prof_id,
			),
			this.managerClients.findCensusGenderClientByUnityOrProf(
				unity_id,
				date_start,
				date_end,
				prof_id,
			),
			this.manager.findMediaTimeAttendanceByUnityOrProf(
				unity_id,
				date_start,
				date_end,
				prof_id,
			),
			this.managerClients.findNewAndOldClientsByUnityOrProf(
				unity_id,
				date_start,
				date_end,
				prof_id,
			),
		])

		if (
			scheduled_eventsOrErr.isLeft() ||
			health_insurancesOrErr.isLeft() ||
			partnersOrErr.isLeft() ||
			proceduresOrErr.isLeft() ||
			gender_clientOrErr.isLeft() ||
			media_time_attendanceOrErr.isLeft() ||
			new_and_old_clientsOrErr.isLeft()
		) {
			return left(
				new AbstractError('Error on find census activities by unity', 400),
			)
		}

		const scheduled_events = scheduled_eventsOrErr.extract()
		const health_insurances = health_insurancesOrErr.extract()
		const partners = partnersOrErr.extract()
		const procedures = proceduresOrErr.extract()
		const gender_clients = gender_clientOrErr.extract()
		const media_time_attendance = media_time_attendanceOrErr.extract()
		const new_and_old_clients = new_and_old_clientsOrErr.extract()

		return right({
			scheduled_events,
			health_insurances,
			partners,
			procedures,
			gender_clients,
			media_time_attendance,
			new_and_old_clients,
		})
	}
}
