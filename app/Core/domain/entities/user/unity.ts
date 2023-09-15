import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IBilling } from 'App/Types/IBilling'
import { IHoliday } from 'App/Types/IHoliday'
import { IUnity } from 'App/Types/IUnity'
import { addDays } from 'date-fns'
import * as z from 'zod'
import { Entity } from '../abstract/entity.abstract'

import { cnpj, cpf } from 'cpf-cnpj-validator'
import Document from '../validations/document'
import Email from '../validations/email'

const validateSchema = z.object({
	_id: z.string().nullable().optional(),
	name: z.string(),
	is_company: z.boolean().optional(),
	document: z.string().refine((val) => {
		const numbers = val.replace(/\D/g, '')
		return cpf.isValid(numbers) || cnpj.isValid(numbers)
	}),
	date_expiration: z.date().optional(),
	active: z.boolean(),
	email: z.string().email(),
	address: z.string().optional(),
	address_number: z.string().optional(),
	avatar: z.string().optional(),
	cep: z.string().optional(),
	city: z.string().optional(),
	cnaes: z.string().optional(),
	complement: z.string().optional(),
	country: z.string().optional(),
	name_company: z.string(),
	neighborhood: z.string().optional(),
	obs: z.string().optional(),
	phones: z.array(z.object({ value: z.string(), id: z.number() })).optional(),
	site: z.string().optional(),
	state: z.string().optional(),
	revenue_reports: z.object({}).optional(),
	holidays: z.array(z.object({})).optional(),
	created_at: z.date().nullable().optional(),
	updated_at: z.date().nullable().optional(),
})

export class UnityEntity extends Entity implements IUnity {
	name: string
	is_company: boolean
	document: string
	date_expiration: Date
	active: boolean
	email: string
	address: string
	address_number: string
	avatar: string
	cep: string
	city: string
	cnaes: string
	complement: string
	country: string
	name_company: string
	neighborhood: string
	obs: string
	phones: Nullable<{ value: string; id: number }>[]
	site: string
	state: string
	revenue_reports: { [key: number]: IBilling }
	holidays: IHoliday[]
	franchised: boolean

	private constructor() {
		super()
	}

	defineName(name = ''): this {
		this.name = name
		return this
	}

	defineFranchised(franchised = false): this {
		this.franchised = franchised
		return this
	}

	defineIsCompany(is_company = true): this {
		this.is_company = is_company
		return this
	}

	defineDocument(document = '', force = false): this {
		const numbers = document.replace(/\D/g, '')
		this.document = Document.build(numbers, force).value
		return this
	}

	defineDateExpiration(date_expiration = addDays(new Date(), 5)): this {
		this.date_expiration = date_expiration
		return this
	}

	defineActive(active = false): this {
		this.active = active
		return this
	}

	defineEmail(email = ''): this {
		this.email = Email.build(email).value
		return this
	}

	defineAddress(address = ''): this {
		this.address = address
		return this
	}

	defineAddressNumber(address_number = ''): this {
		this.address_number = address_number
		return this
	}

	defineAvatar(avatar = ''): this {
		this.avatar = avatar
		return this
	}

	defineCep(cep = ''): this {
		this.cep = cep
		return this
	}

	defineCity(city = ''): this {
		this.city = city
		return this
	}

	defineCnaes(cnaes = ''): this {
		this.cnaes = cnaes
		return this
	}

	defineComplement(complement = ''): this {
		this.complement = complement
		return this
	}

	defineCountry(country = ''): this {
		this.country = country
		return this
	}

	defineNameCompany(name_company = ''): this {
		this.name_company = name_company
		return this
	}

	defineNeighborhood(neighborhood = ''): this {
		this.neighborhood = neighborhood
		return this
	}

	defineObs(obs = ''): this {
		this.obs = obs
		return this
	}

	definePhones(phones: Nullable<{ value: string; id: number }>[] = []): this {
		this.phones = phones
		return this
	}

	defineSite(site = ''): this {
		this.site = site
		return this
	}

	defineState(state = ''): this {
		this.state = state
		return this
	}

	defineRevenueReports(revenue_reports: { [key: number]: IBilling } = {}): this {
		this.revenue_reports = revenue_reports
		return this
	}

	defineHolidays(holidays: IHoliday[] = []): this {
		this.holidays = holidays
		return this
	}

	static async build(params: IUnity): PromiseEither<AbstractError, UnityEntity> {
		try {
			const unity = new UnityEntity()
				.defineId(params._id?.toString() || '')
				.defineActive(params.active)
				.defineAddress(params.address)
				.defineAddressNumber(params.address_number)
				.defineAvatar(params.avatar)
				.defineCep(params.cep)
				.defineCity(params.city)
				.defineCnaes(params.cnaes)
				.defineComplement(params.complement)
				.defineCountry(params.country)
				.defineDateExpiration(params.date_expiration)
				.defineDocument(params.document, true)
				.defineEmail(params.email)
				.defineHolidays(params.holidays)
				.defineIsCompany(params.is_company)
				.defineName(params.name)
				.defineNameCompany(params.name_company)
				.defineNeighborhood(params.neighborhood)
				.defineObs(params.obs)
				.definePhones(params.phones)
				.defineRevenueReports(params.revenue_reports)
				.defineSite(params.site)
				.defineState(params.state)
				.defineFranchised(params.franchised)
				.defineCreatedAt(params.created_at)
				.defineUpdatedAt(params.updated_at)

			await validateSchema.parseAsync(unity)

			return right(unity)
		} catch (error) {
			return left(error as any)
		}
	}
}
