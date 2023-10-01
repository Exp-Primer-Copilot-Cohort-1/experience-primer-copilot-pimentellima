import areRangesIntersecting from 'App/utils/are-ranges-intersecting'
import { getDay, isAfter, startOfYesterday } from 'date-fns'
import { z } from 'zod'

const validationActivity = (profData, scheduleBlocks) =>
	z.object({
		prof: z.string(),
		client: z.string(),
		date: z
			.date()
			.refine((val) => isAfter(val, startOfYesterday()))
			.refine((val) => {
				const weekDay = getDay(val)
				if (
					(weekDay === 0 && !profData.is_sunday) ||
					(weekDay === 1 && !profData.is_monday) ||
					(weekDay === 2 && !profData.is_tuesday) ||
					(weekDay === 3 && !profData.is_thursday) ||
					(weekDay === 4 && !profData.is_wednesday) ||
					(weekDay === 5 && !profData.is_friday) ||
					(weekDay === 6 && !profData.is_saturday)
				) {
					return false
				}
				return true
			}),
		hour_start: z.string(),
		hour_end: z.string(),
		procedures: z.array(
			z.object({
				_id: z.string(),
				minutes: z.number(),
				price: z.number(),
				health_insurance: z.string(),
			}),
		),
	})
		.refine(({ hour_start, hour_end }) => {
			for (const sb of scheduleBlocks) {
				if (
					areRangesIntersecting({
						range1Start: new Date(hour_start),
						range1End: new Date(hour_end),
						range2Start: new Date(sb.hour_start),
						range2End: new Date(sb.hour_end),
					})
				) {
					return false
				}
			}
			return true
		})

export default validationActivity