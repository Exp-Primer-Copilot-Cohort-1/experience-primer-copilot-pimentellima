import { z } from 'zod'

export default z.object({
	value: z.string(),
	label: z.string(),
	color: z.string(),
	price: z.number().positive(),
	minutes: z.number(),
	health_insurance: z
		.object({
			value: z.string(),
			label: z.string(),
		})
		.required(),
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
				value: z.string(),
				label: z.string(),
				quantity: z.number(),
				price_cost: z.number(),
				price_final: z.number(),
			}),
		)
		.optional()
		.nullable(),
})
