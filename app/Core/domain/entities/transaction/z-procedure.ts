import { z } from 'zod'

export default z.object({
	_id: z.string(),
	color: z.string(),
	price: z.number().positive(),
	minutes: z.number(),
	health_insurance: z.string(),
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
