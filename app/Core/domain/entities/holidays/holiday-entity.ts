import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { HolidayType, IHoliday } from 'App/Types/IHoliday'
import { IsEnum, IsString, validateSync } from 'class-validator'
import { Entity } from '../abstract/entity.abstract'

export class EntityHoliday extends Entity implements IHoliday {
	@IsString() date: string
	@IsString() name: string
	@IsEnum(HolidayType) type: HolidayType

	// date formato iso string
	defineDate(date: string): this {
		// regex para validar data no formato yyyy-mm-dd
		const regex = new RegExp(
			'^(19|20)\\d\\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$',
		)

		if (!regex.test(date)) {
			throw new AbstractError('Data inválida', 400)
		}

		this.date = date
		return this
	}

	defineName(name: string): this {
		if (name.length < 3) {
			throw new AbstractError('Nome inválido', 400)
		}

		this.name = name
		return this
	}

	defineType(type: HolidayType): this {
		this.type = type
		return this
	}

	public static async build(
		params: IHoliday,
	): PromiseEither<AbstractError, EntityHoliday> {
		try {
			const entity = new EntityHoliday()
				.defineDate(params.date)
				.defineName(params.name)
				.defineType(params.type)

			const errors = validateSync(entity)

			if (errors.length > 0) throw errors

			return right(entity)
		} catch (error) {
			return left(new AbstractError('Erro ao criar feriado', 400, error))
		}
	}
}
