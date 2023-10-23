import { ActivityPaymentEntity } from 'App/Core/domain/entities/activity-payment/ActivityPaymentEntity'
import { ActivityNotFoundError } from 'App/Core/domain/errors'
import { PaymentAlreadyError } from 'App/Core/domain/errors/payment-already-error'
import { UpdateStatusActivityError } from 'App/Core/domain/errors/update-status-activity'
import { AbstractError } from 'App/Core/errors/error.interface'
import { ISessionTransaction } from 'App/Core/infra/infra'
import { SessionTransaction } from 'App/Core/infra/session-transaction'
import { PromiseEither, left, right } from 'App/Core/shared'
import { AppointmentStatus, PaymentStatus } from 'App/Helpers'
import Activity from 'App/Models/Activity'
import { IActivity } from 'App/Types/IActivity'
import { ITransaction } from 'App/Types/ITransaction'
import { inject, injectable, registry } from 'tsyringe'
import { ActivitiesManagerAttendanceContract } from '../interface/activity-manager-attendance.interface'

@injectable()
@registry([{ token: ActivityAttendanceMongoRepository, useClass: ActivityAttendanceMongoRepository }])
export class ActivityAttendanceMongoRepository
	implements ActivitiesManagerAttendanceContract { // eslint-disable-line
	// eslint-disable-line
	constructor(
		@inject(SessionTransaction) private readonly session: ISessionTransaction
	) { } // eslint-disable-line

	async startActivity(
		id: string,
		started_at: Date,
	): PromiseEither<AbstractError, IActivity> {
		const activity = await Activity.findByIdAndUpdate(
			id,
			{
				$set: {
					started_at,
					scheduled: AppointmentStatus.IN_PROGRESS,
				},
			},
			{
				returnDocument: 'after',
			},
		)
		if (!activity) return left(new AbstractError('Error updating activity', 500))

		return right(activity.toObject())
	}

	async stopActivity(
		id: string,
		finished_at: Date,
	): PromiseEither<AbstractError, IActivity> {
		const activity = await Activity.findByIdAndUpdate(
			id,
			{
				$set: {
					finished_at,
					scheduled: AppointmentStatus.COMPLETED,
				},
			},
			{
				returnDocument: 'after',
			},
		)
		if (!activity) return left(new AbstractError('Error updating activity', 500))
		return right(activity.toObject())
	}

	async updateStatusById(
		id: string,
		status: AppointmentStatus,
	): PromiseEither<AbstractError, IActivity> {

		const activity = await Activity.findByIdAndUpdate(
			id,
			{
				$set: {
					scheduled: status,
				},
			},
			{
				new: true,
			},
		)
			.orFail(new ActivityNotFoundError())


		if (!activity) return left(new UpdateStatusActivityError())

		return right(activity)
	}

	async updatePayment(
		id: string,
		values: Partial<ITransaction>,
	): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new ActivityNotFoundError())

		const paymentOrErr = await ActivityPaymentEntity.build(values as ITransaction)

		if (paymentOrErr.isLeft()) return left(paymentOrErr.extract())

		const payments = paymentOrErr.extract()

		const updatedActivity = await Activity.findOneAndUpdate(
			{ _id: id, 'payment.price': { $exists: false } },
			{
				$set: {
					payment: {
						amount: payments.amount,
						date: payments.date,
						paymentForm: payments.paymentForm,
					},
					status: PaymentStatus.PAID,
				},
			},
			{
				new: true,
				...this.session?.options,
			},
		).orFail(new PaymentAlreadyError())

		return right(updatedActivity as unknown as IActivity)
	}
}
