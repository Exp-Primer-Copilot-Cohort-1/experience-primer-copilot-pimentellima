import { NotificationNotIsRequired } from "App/Core/domain/errors";
import { PromiseEither, left } from "App/Core/shared";
import { BasicProcedure } from "App/Types/IProcedure";
import { inject, injectable, registry } from "tsyringe";
import { SendEmailError } from "../../errors/send-email.err";
import EDGE, { ISendEmailUseCase } from "../helpers/edge";
import { SendEmailUseCase } from "./send-email-use-case";
import {
	ISendNotificationNewAppointmentUseCase,
	InNotificationNewAppointment
} from "./use-cases.interface";


const makeTrProcedure = (procedure: BasicProcedure) => ({
	name: procedure.name,
	minutes: procedure.minutes,
	price: Intl.NumberFormat(
		'pt-BR',
		{
			style: 'currency',
			currency: 'BRL'
		})
		.format(procedure.price)
})

/**
 * Envia uma notificação por e-mail para o remetente de um novo agendamento.
 */
@injectable()
@registry([{ token: SendNotificationNewAppointment, useClass: SendNotificationNewAppointment }])
export class SendNotificationNewAppointment implements ISendNotificationNewAppointmentUseCase {

	constructor(
		@inject(SendEmailUseCase) private readonly send: ISendEmailUseCase,
	) { }

	/**
	 * Executa o caso de uso de envio de notificação de novo agendamento.
	 * @param {InNotificationNewAppointment} data - Dados da notificação.
	 * @returns {PromiseEither<SendEmailError | NotificationNotIsRequired, Message>} - Resultado da operação.
	 */
	async execute({
		client, date, from, procedures, prof, unity
	}: InNotificationNewAppointment): PromiseEither<
		SendEmailError | NotificationNotIsRequired,
		Message
	> {

		if (!from.hasNotificationByEmail) return left(new NotificationNotIsRequired())

		const formatDate = Intl.DateTimeFormat('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		}).format(
			typeof date === 'string' ? new Date(date) : date
		)

		const props = {
			from: from.name,
			patient: client.name,
			date: formatDate,
			amount: Intl.NumberFormat(
				'pt-BR',
				{
					style: 'currency',
					currency: 'BRL'
				})
				.format(procedures.reduce((acc, cur) => acc + cur.price, 0)),
			procedures: procedures?.map(makeTrProcedure),
			prof: prof.name,
			unity: unity.name,
		}

		const sendEmailOrErr = await this.send.execute({
			edge: EDGE.appointment,
			email: from.email as string,
			props,
			title: 'Novo Agendamento',
		})

		return sendEmailOrErr
	}
}