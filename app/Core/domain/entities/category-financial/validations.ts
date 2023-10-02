import { FinancialCategoryType } from 'App/Types/IFinancialCategory'
import { z } from 'zod'

const validationsSchema = () =>
	z.object({
		name: z.string(),
		active: z.boolean(),
		unity_id: z.string(),
		type: z.string().refine((val) => {
			if (val !== FinancialCategoryType.Expense && val !== FinancialCategoryType.Revenue) {
				return false
			}
			return true
		}),
	})

export default validationsSchema