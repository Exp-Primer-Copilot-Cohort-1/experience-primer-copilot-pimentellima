import { ActivitiesManagerInterface } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { IActivity, PaymentValues } from "Types/IActivity";

type Props = PaymentValues & {
	id: string;
};

export class UpdateActivityPaymentUseCase implements UseCase<Props, IActivity> {
	constructor(
		private readonly activitiesManager: ActivitiesManagerInterface
	) {}

	public async execute(
		params: Props
	): PromiseEither<AbstractError, IActivity> {
		const { id, ...other } = params;
		const activityOrErr =
			await this.activitiesManager.updateActivityPayment(id, other);

		if (activityOrErr.isLeft()) return left(activityOrErr.extract());
		const newActivity = activityOrErr.extract();
		return right(newActivity);
	}
}
