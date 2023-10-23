import { UserNotFoundError } from 'App/Core/domain/errors'
import ScheduleBlock from 'App/Models/ScheduleBlock'
import User from 'App/Models/User'
import { IScheduleBlock } from 'App/Types/IScheduleBlock'
import { IUser } from 'App/Types/IUser'
import { isSameDay } from 'date-fns'

async function fetchUserAndScheduleBlocks(prof: string, date: string) {
	const profData: IUser | null = await User.findById(prof).orFail(new UserNotFoundError())

	const scheduleBlocksData: IScheduleBlock[] = await ScheduleBlock.find({
		'prof.value': prof,
	})

	const scheduleBlocks = scheduleBlocksData.filter((item) => {
		return isSameDay(new Date(date), new Date(item.date))
	})

	return { profData, scheduleBlocks }
}

export default fetchUserAndScheduleBlocks