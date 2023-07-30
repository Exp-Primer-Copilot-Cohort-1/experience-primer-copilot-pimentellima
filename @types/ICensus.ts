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
	'0': number
	'1': number
	'2': number
	'3': number
	'4': number
	'5': number
	'6': number
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
