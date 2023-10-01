import { z } from 'zod';

const validationClient = () => z.object({
	_id: z.string().optional(), // Opcional
	unity_id: z.string().optional(), // Opcional
	name: z.string().min(3),
	birth_date: z.date().or(z.string()).refine((value) => {
		if (typeof value === "string") {
			return new Date(value).toString() !== "Invalid Date";
		}
		return true;
	}),
	celphone: z.string(),
})

export default validationClient