import { z } from 'zod'

export default z.object({
	_id: z.string(),
	color: z.string(),
	price: z.number().positive(),
	minutes: z.number(),
	health_insurance: z.string(),
	payment_participation: z
		.object({
			value: z.string(),
			percent: z.number(),
			price: z.number(),
		})
		.required(),
	stocks: z
		.array(
			z.object({
				_id: z.string(),
				quantity: z.number(),
				price_cost: z.number(),
				price_final: z.number(),
			}),
		)
		.optional()
		.nullable(),
})
