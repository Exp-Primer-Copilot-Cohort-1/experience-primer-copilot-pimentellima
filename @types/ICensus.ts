import { AppointmentStatus } from 'App/Helpers'

type GenericCount = {
	label: string
	count: number
}

export type ICensusScheduledEvent = {
	rescheduled: number
	canceled: number
	canceled_client: number
	awaiting: number
	completed: number
	confirmed: number
	scheduled: number
	in_progress: number
}

export type ICensusGenrerClient = {
	not_informed: number
	male: number
	female: number
}

export type ICensusCountProcedure = GenericCount

export type ICensusCountHealthInsurances = GenericCount

export type ICensusCountPartners = GenericCount

export type ICensusMediaTimeAttendance = number

export type ICensusNewAndOldClients = {
	new: number
	old: number
}

export type ICensusActivitiesByDays = {
	scheduledCounts: { scheduled: AppointmentStatus; count: number }[]
	dayOfWeek: number
}

export type ICensusActivitiesByDaysOfMonth = {
	scheduled: AppointmentStatus
	count: number
	day: Date
}

export type ICensusActivitiesByProf = {
	label: string
	count: number
	value: string
}

export type ICensusActivitiesByHealthInsurance = {
	label: string
	count: number
	value: string
	total: number
}

export type ICensusPaymentForm = {
	count: number
	value: string
	total: number
}

export type ICensusPaymentByProf = {
	label: string
	count: number
	value: string
	total: number
}

export type ICensusParticipationPaymentByProf = {
	value: string
	label: string
	count: number
	total: number
}

export type ICensusRevenuesOfYearByUnityByProf = [
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
]
