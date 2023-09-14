import {
	ICensusActivitiesByDaysOfMonth,
	ICensusActivitiesByHealthInsurance,
	ICensusActivitiesByProf,
	ICensusCost,
	ICensusCountHealthInsurances,
	ICensusCountPartners,
	ICensusCountProcedure,
	ICensusGenderClient,
	ICensusMediaTimeAttendance,
	ICensusNewAndOldClients,
	ICensusParticipationPaymentByProf,
	ICensusPaymentByProf,
	ICensusPaymentForm,
	ICensusRevenuesOfYearByUnityByProf,
	ICensusScheduledEvent,
} from 'App/Types/ICensus'

export type ICensusCount = {
	procedures: ICensusCountProcedure[]
	health_insurances: ICensusCountHealthInsurances[]
	partners: ICensusCountPartners[]
	scheduled_events: ICensusScheduledEvent
	gender_clients: ICensusGenderClient
	media_time_attendance: ICensusMediaTimeAttendance
	new_and_old_clients: ICensusNewAndOldClients
}

export type ICensusPayments = {
	count_by_days: ICensusActivitiesByDaysOfMonth[]
	count_by_activity_by_prof: ICensusActivitiesByProf[]
	payments_by_health_insurances: ICensusActivitiesByHealthInsurance[]
	payment_by_prof: ICensusPaymentByProf[]
	payment_by_partners: ICensusPaymentByProf[]
	payment_participation_by_prof: ICensusParticipationPaymentByProf[]
	payment_form: ICensusPaymentForm[]
	revenues_activities: {
		accrual_regime: ICensusRevenuesOfYearByUnityByProf
		cash_regime: ICensusRevenuesOfYearByUnityByProf
	}
	cost: ICensusCost[]
}
