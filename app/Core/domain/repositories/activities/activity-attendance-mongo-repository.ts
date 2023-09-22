import { AbstractError } from 'App/Core/errors/error.interface'
import { ISessionTransaction } from 'App/Core/helpers/session-transaction'
import { PromiseEither, left, right } from 'App/Core/shared'
import { AppointmentStatus, PaymentStatus } from 'App/Helpers'
import Activity, { COLLECTIONS_REFS } from 'App/Models/Activity'
import { IActivity } from 'App/Types/IActivity'
import { ITransaction } from 'App/Types/ITransaction'
import { ActivityPaymentEntity } from '../../entities/activity-payment/ActivityPaymentEntity'
import { ActivityNotFoundError } from '../../errors'
import { PaymentAlreadyError } from '../../errors/payment-already-error'
import { PROJECTION_CLIENT, PROJECTION_DEFAULT } from '../helpers/projections'
import { ActivitiesManagerAttendanceInterface } from '../interface/activity-manager-attendance.interface'

export class ActivityAttendanceMongoRepository
	implements ActivitiesManagerAttendanceInterface { // eslint-disable-line
	// eslint-disable-line
	constructor(private readonly session?: ISessionTransaction) { } // eslint-disable-line

	async updateActivityStartedAt(
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

	async updateActivityFinishedAt(
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

	async updateActivityStatusById(
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
				returnDocument: 'after',
			},
		)
			.populate(COLLECTIONS_REFS.CLIENTS, PROJECTION_CLIENT)
			.populate(COLLECTIONS_REFS.PROFS, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.PROCEDURES, PROJECTION_DEFAULT)
			.populate(COLLECTIONS_REFS.HEALTH_INSURANCES, PROJECTION_DEFAULT)
			.sort({ date: -1 })
			.orFail(new ActivityNotFoundError())
		if (!activity) return left(new AbstractError('Error updating activity', 500))

		return right(activity.toObject())
	}

	async updateActivityPayment(
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
