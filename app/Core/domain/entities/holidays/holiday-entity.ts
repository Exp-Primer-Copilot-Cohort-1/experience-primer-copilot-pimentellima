import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IHoliday } from 'Types/IHoliday'
import { Entity } from '../abstract/entity.abstract'

export class EntityHoliday extends Entity implements IHoliday {
	_date: string
	_name: string
	_type: 'nacional' | 'estadual' | 'municipal'

	get date(): string {
		return this._date
	}

	get name(): string {
		return this._name
	}

	get type(): 'nacional' | 'estadual' | 'municipal' {
		return this._type
	}

	// date formato iso string
	defineDate(date: string): this {
		// regex para validar data no formato yyyy-mm-dd
		const regex = new RegExp(
			'^(19|20)\\d\\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$',
		)

		if (!regex.test(date)) {
			throw new AbstractError('Data inválida', 400)
		}

		this._date = date
		return this
	}

	defineName(name: string): this {
		if (name.length < 3) {
			throw new AbstractError('Nome inválido', 400)
		}

		this._name = name
		return this
	}

	defineType(type: 'nacional' | 'estadual' | 'municipal'): this {
		this._type = type
		return this
	}

	public static async build(
		params: IHoliday,
	): PromiseEither<AbstractError, EntityHoliday> {
		try {
			return right(
				new EntityHoliday()
					.defineDate(params.date)
					.defineName(params.name)
					.defineType(params.type),
			)
		} catch (error) {
			return left(new AbstractError('Erro ao criar feriado', 400, error))
		}
	}
}
