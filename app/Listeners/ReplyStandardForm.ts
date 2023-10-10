import type { EventsList } from '@ioc:Adonis/Core/Event';
import { RFormSFMongooseManager } from 'App/Core/domain/repositories/reply-form-standard-franchise/reply-form-standard-franchise-mongoose-repository';
import { VerifyCurrentReplyInLessThanPreviousUseCase } from 'App/Core/domain/use-cases';
import logger from 'App/Core/infra/logger';
import container from 'App/Core/shared/container';
import EDGE from 'App/Mail/constants/edge';
import Mail from 'App/Mail/entity/mail';
import { retry } from 'ts-retry-promise';
export default class ReplySFormFranchise {
	async onNewReplyFormStandardFranchise(data: EventsList['new:reply-form-standard-franchise']) {
		const controller = container.resolve(VerifyCurrentReplyInLessThanPreviousUseCase)
		await controller.execute(data)
	}

	async onNewEmailCurrentReplyInGreaterPrevious(data: EventsList['new:email-current-reply-in-greater-previous']) {
		const manager = new RFormSFMongooseManager()
		const infoOrErr = await manager.findInfoThisReply(data.group_id)

		if (infoOrErr.isLeft()) return

		const info = infoOrErr.extract()

		const promiseSendCoordinator = retry(async () => Mail.send({
			edge: EDGE.reply_current_greater_previous,
			props: {
				label: info.coordinator.name,
				...info
			},
			email: info.coordinator.email || info.unity.email, // email do coordenador
			title: 'Aviso! Paciente não apresentou melhora no tratamento',
		}), {
			logger: (msg) => logger.emit(msg),
			retries: 5
		})

		const promiseSendProf = retry(async () => Mail.send({
			edge: EDGE.reply_current_greater_previous,
			props: {
				label: info.prof.name,
				...info
			},
			email: info.prof.email, // email do profissional
			title: 'Aviso! Paciente não apresentou melhora no tratamento',
		}), {
			logger: (msg) => logger.emit(msg),
			retries: 5
		})


		await Promise.all([
			promiseSendCoordinator,
			promiseSendProf
		])
	}
}
