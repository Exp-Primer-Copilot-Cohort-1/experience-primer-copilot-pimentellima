/* eslint-disable @typescript-eslint/naming-convention */
export interface IDaysOffice {
	_id: string
	name?: string
	receive_email_in_the_new_appointment?: boolean
	show_lack?: boolean
	exib_minutes: number
	hour_end: string
	hour_end_lunch: string
	hour_start: string
	hour_start_lunch: string
	is_friday: boolean
	is_monday: boolean
	is_saturday: boolean
	is_sunday: boolean
	is_thursday: boolean
	is_tuesday: boolean
	is_wednesday: boolean
	lunch_time_active: boolean
	unity_id?: string
	schedule_obs?: string
}
