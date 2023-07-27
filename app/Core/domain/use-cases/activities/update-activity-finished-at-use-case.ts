import { ActivitiesManagerInterface } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import Activity from "App/Models/Activity";
import Procedure from "App/Models/Procedure";
import Stock from "App/Models/Stock";
import { IActivity } from "Types/IActivity";
import { ActivityNotFoundError } from "../../errors/activity-not-found";

type Props = {
	id: string;
	finished_at: Date;
};

export class UpdateActivityFinishedAtUseCase
	implements UseCase<Props, IActivity>
{
	constructor(
		private readonly activitiesManager: ActivitiesManagerInterface
	) {}

	public async execute(
		params: Props
	): PromiseEither<AbstractError, IActivity> {
		const activity = await Activity.findById(params.id);
		if (!activity) return left(new ActivityNotFoundError());

		const stocksData = await Stock.find();
		const proceduresData = await Procedure.find({
			_id: {
				$in: activity.procedures.map((p) => p.value),
			},
		});
		const productsWithQuantities = new Object();
		activity.procedures.forEach((procedure) => {
			const products = proceduresData.find(
				(p) => p._id.toString() === procedure.value
			)?.products;

			if (!products) return;
			products.forEach((product) => {
				const productData = stocksData.find(
					(p) => p._id.toString() === product.value
				);
				if (!productData?.stock_automatic) return;

				if (productsWithQuantities[product.value]) {
					productsWithQuantities[product.value] += product.quantity;
				} else productsWithQuantities[product.value] = product.quantity;
			});
		});

		Object.keys(productsWithQuantities).forEach(async (key) => {
			await Stock.findByIdAndUpdate(
				{ _id: key },
				{
					$inc: { quantity: -productsWithQuantities[key] },
				},
				{
					new: true,
					returnDocument: "after",
				}
			);
		});

		const updatedActivityOrErr =
			await this.activitiesManager.updateActivityFinishedAt(
				params.id,
				params.finished_at
			);

		if (updatedActivityOrErr.isLeft())
			return left(updatedActivityOrErr.extract());
		return right(updatedActivityOrErr.extract());
	}
}
