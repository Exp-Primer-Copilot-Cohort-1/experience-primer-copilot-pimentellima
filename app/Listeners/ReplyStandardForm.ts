import type { EventsList } from '@ioc:Adonis/Core/Event';
import {
	SendCurrentReplyInGreaterPreviousUseCase,
	VerifyCurrentReplyInLessThanPreviousUseCase
} from 'App/Core/domain/use-cases';
import container from 'App/Core/shared/container';
export default class ReplySFormFranchise {
	async onNewReplyFormStandardFranchise(data: EventsList['new:reply-form-standard-franchise']) {
		const controller = container.resolve(VerifyCurrentReplyInLessThanPreviousUseCase)
		await controller.execute(data)
	}

	async onNewEmailCurrentReplyInGreaterPrevious(data: EventsList['new:email-current-reply-in-greater-previous']) {
		const controller = container.resolve(SendCurrentReplyInGreaterPreviousUseCase)
		await controller.execute(data)
	}
}
