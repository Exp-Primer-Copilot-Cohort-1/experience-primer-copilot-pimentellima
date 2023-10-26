import type { EventsList } from '@ioc:Adonis/Core/Event';
import { SendNewAppointment } from 'App/Core/domain/use-cases/email/send-new-appointment';
import container from 'App/Core/shared/container';

export default class Appointment {
	async onNewAppointment(activity: EventsList['new:appointment']) {
		const useCase = container.resolve(SendNewAppointment)
		return useCase.execute(activity)
	}
}
