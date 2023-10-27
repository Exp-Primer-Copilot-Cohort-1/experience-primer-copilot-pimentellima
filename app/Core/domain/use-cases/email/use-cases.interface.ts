import { UseCase } from "App/Core/interfaces/use-case.interface"
import { BasicProcedure } from "App/Types/IProcedure"

type Person = {
	name: string,
	email?: string,
}

export type InNotificationNewAppointment = {
	client: Person,
	from: Person & { hasNotificationByEmail: boolean },
	prof: Person,
	unity: Person,
	procedures: BasicProcedure[]
	date: string,
}

export type ISendNotificationNewAppointmentUseCase = UseCase<InNotificationNewAppointment, Message>