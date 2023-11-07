import isValidDate from 'date-fns/isValid'
import parse from 'date-fns/parse'
import parseISO from 'date-fns/parseISO'
import { z } from 'zod'
import { Validate } from '../abstract/validate.abstract'
import { BirthDateInvalidError, BirthDateInvalidRangeError } from '../errors/birth-date-invalid'

class BirthDate extends Validate<Date> {
	private constructor(birthDate: Date) {
		super(birthDate)
		this.validate(birthDate)
	}

	public validate(birthDate: Date): this {
		const birthDateSchema = z
			.date()
			.min(new Date('1900-01-01'))
			.max(new Date())

		const { success } = birthDateSchema.safeParse(birthDate)

		if (!success) {
			throw new BirthDateInvalidRangeError()
		}

		return this
	}

	public static build(birthDate: string | Date): BirthDate {
		const date = parse(birthDate as string, 'dd/MM/yyyy', new Date())
		const iso = parseISO(birthDate as string)

		const newBirthDate = date.toString() !== 'Invalid Date' ? date : iso

		if (!isValidDate(newBirthDate)) {
			throw new BirthDateInvalidError()
		}

		return new BirthDate(newBirthDate as Date)
	}
}

export default BirthDate
