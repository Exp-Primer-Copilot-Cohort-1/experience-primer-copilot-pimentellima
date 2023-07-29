import Stock from "App/Models/Stock";
import { isBefore, isSameDay } from "date-fns";
import { z } from "zod";

class StocksController {
	async index({ auth, request }) {
		const params = request.qs();

		const active = params.active === "false" ? false : true;

		const userLogged = auth.user;
		const stocks = Stock.where({
			unity_id: userLogged.unity_id,
			active,
		});

		return stocks;
	}

	async show({ params }) {
		const stocks = await Stock.findById(params.id);

		return stocks;
	}

	async store({ request, auth }) {
		const userLogged = auth.user;
		const data = request.all();

		const parsedData = z.object({
			name: z.string(),
			batches: z
				.array(
					z.object({
						name: z.string(),
						quantity: z.number(),
						minimum_quantity: z.number(),
						date_batch: z.string(),
						price_cost: z.string(),
						price_final: z.string(),
					})
				)
				.transform((arr) =>
					arr.sort((a, b) => {
						if (
							isBefore(
								new Date(a.date_batch),
								new Date(b.date_batch)
							)
						)
							return -1;
						if (
							isSameDay(
								new Date(a.date_batch),
								new Date(b.date_batch)
							)
						)
							return 0;
						else return 1;
					})
				),
			stock_automatic: z.boolean(),
		}).parse(data);

		const stocks = await Stock.create({
			...parsedData,
			active: true,
			unity_id: userLogged.unity_id,
		});

		return stocks;
	}

	async destroy({ params }) {
		await Stock.findByIdAndDelete({ _id: params.id }).orFail();
	}

	async updateActive({ params, request }) {
		const { active } = request.only(["active"]);

		const stock = await Stock.findByIdAndUpdate(params.id, {
			$set: {
				active,
			},
			new: true,
		});
		return stock;
	}

	async update({ params, request }) {
		const data = request.all();

		const parsedData = z.object({
			name: z.string(),
			batches: z
				.array(
					z.object({
						name: z.string(),
						quantity: z.number(),
						minimum_quantity: z.number(),
						date_batch: z.string(),
						price_cost: z.string(),
						price_final: z.string(),
					})
				)
				.transform((arr) =>
					arr.sort((a, b) => {
						if (
							isBefore(
								new Date(a.date_batch),
								new Date(b.date_batch)
							)
						)
							return -1;
						if (
							isSameDay(
								new Date(a.date_batch),
								new Date(b.date_batch)
							)
						)
							return 0;
						else return 1;
					})
				),
			stock_automatic: z.boolean(),
		}).parse(data);

		const stock = await Stock.findByIdAndUpdate(params.id, parsedData, {
			new: true,
		}).orFail();
		return stock;
	}
}

export default StocksController;
