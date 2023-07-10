import { IHoliday } from 'Types/IHoliday'
import axios from 'axios'

type Holiday = {
	date: string
	name: string
	type: 'national'
}

export const getHolidayByMonth = async (
	month: number,
	year: string,
): Promise<Holiday[]> => {
	const { data } = await axios.get<Holiday[]>(
		`https://brasilapi.com.br/api/feriados/v1/${year}`,
	)

	return data.filter((holiday) => {
		return holiday.date.startsWith(
			`${year}-${month.toLocaleString('pt-BR', { minimumIntegerDigits: 2 })}`,
		)
	})
}

export const fetchHolidays = async (year: number | string) => {
	const { data } = await axios.get<IHoliday[]>(
		`https://brasilapi.com.br/api/feriados/v1/${year}`,
	)

	return data
}
