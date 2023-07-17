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
