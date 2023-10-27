import { SendEmailError } from "App/Core/domain/errors/send-email.err";
import {
	ClientsMongooseRepository,
	ProceduresMongooseRepository,
	ProfsMongooseRepository,
	UnitiesMongooseRepository
} from "App/Core/domain/repositories";
import {
	ClientManagerContract,
	ProceduresManagerContract,
	ProfsManagerContract,
	UnitiesManagerContract
} from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { IActivity } from "App/Types/IActivity";
import { BasicProcedure } from "App/Types/IProcedure";
import { inject, injectable, registry } from 'tsyringe';
import { SendNotificationNewAppointment } from "./send-notification-new-appointment-use-case";
import { ISendNotificationNewAppointmentUseCase } from './use-cases.interface';
@injectable()
@registry([{ token: SendNewAppointment, useClass: SendNewAppointment }])
export class SendNewAppointment implements UseCase<IActivity, Message> {

	constructor(
		@inject(ClientsMongooseRepository)
		private readonly clientsRepository: ClientManagerContract,
		@inject(ProceduresMongooseRepository)
		private readonly proceduresRepository: ProceduresManagerContract,
		@inject(ProfsMongooseRepository)
		private readonly profsRepository: ProfsManagerContract,
		@inject(UnitiesMongooseRepository)
		private readonly unityRepository: UnitiesManagerContract,
		@inject(SendNotificationNewAppointment)
		private readonly sendNotification: ISendNotificationNewAppointmentUseCase
	) { }

	async execute({
		client,
		date,
		hour_start,
		procedures,
		prof,
		unity_id
	}: IActivity): PromiseEither<AbstractError, Message> {
		const promisesProceduresDataOrError = procedures?.map((procedure) => {
			return this.proceduresRepository.findBasic(
				procedure._id as string,
				procedure.health_insurance as string
			)
		})

		const [
			clientDataOrError,
			profDataOrError,
			unityDataOrError,
			...proceduresDataOrError
		] = await Promise.all([
			this.clientsRepository.findById(client.toString()),
			this.profsRepository.findById(prof.toString()),
			this.unityRepository.findById(unity_id?.toString() as string),
			...promisesProceduresDataOrError
		])

		if (
			clientDataOrError.isLeft() ||
			profDataOrError.isLeft() ||
			unityDataOrError.isLeft() ||
			proceduresDataOrError.some((procedure) => procedure?.isLeft())
		) {
			return left(new SendEmailError())
		}


		const clientData = clientDataOrError.extract()
		const profData = profDataOrError.extract()
		const unityData = unityDataOrError.extract()
		const proceduresData = proceduresDataOrError.map(
			(procedure) => procedure.extract() as BasicProcedure
		)

		const newDate = typeof date === 'string' ? new Date(date) : date
		const hourDate = typeof hour_start === 'string' ? new Date(hour_start) : hour_start

		newDate.setHours(hourDate.getHours())

		const emailData = {
			client: {
				name: clientData.name,
				email: clientData.email,
			},
			prof: {
				name: profData.name,
				email: profData.email,
			},
			unity: {
				name: unityData.name,
				email: unityData.email,
			},
			procedures: proceduresData,
			date: newDate.toString(),
		}

		const promiseSendEmailFromProfOrError = this.sendNotification.execute({
			...emailData,
			from: {
				name: profData.name,
				email: profData.email,
				hasNotificationByEmail: profData.receive_email_in_the_new_appointment as boolean,
			},
		})

		const promiseSendEmailFromClientOrError = this.sendNotification.execute({
			...emailData,
			from: {
				name: clientData.name,
				email: clientData.email,
				hasNotificationByEmail: false,
			},
		})

		const errors: AbstractError[] = []

		const [sendEmailFromProfOrError, sendEmailFromClientOrError] = await Promise.all([
			promiseSendEmailFromProfOrError,
			promiseSendEmailFromClientOrError,
		])

		if (sendEmailFromProfOrError.isLeft()) {
			errors.push(sendEmailFromProfOrError.extract())
		}

		if (sendEmailFromClientOrError.isLeft()) {
			errors.push(sendEmailFromClientOrError.extract())
		}

		return right({
			message: 'Email enviado com sucesso',
			errors
		})
	}
}