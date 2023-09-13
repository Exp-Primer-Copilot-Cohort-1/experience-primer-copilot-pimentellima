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
	private _name: string
	private _is_company: boolean
	private _document: string
	private _date_expiration: Date
	private _active: boolean
	private _email: string
	private _address: string
	private _address_number: string
	private _avatar: string
	private _cep: string
	private _city: string
	private _cnaes: string
	private _complement: string
	private _country: string
	private _name_company: string
	private _neighborhood: string
	private _obs: string
	private _phones: Nullable<{ value: string; id: number }>[]
	private _site: string
	private _state: string
	private _revenue_reports: { [key: number]: IBilling }
	private _holidays: IHoliday[]
	private _franchise: boolean

	get name(): string {
		return this._name
	}

	get is_company(): boolean {
		return this._is_company
	}

	get franchised(): boolean {
		return this._franchise
	}

	get document(): string {
		return this._document
	}

	get date_expiration(): Date {
		return this._date_expiration
	}

	get active(): boolean {
		return this._active
	}

	get email(): string {
		return this._email
	}

	get address(): string {
		return this._address
	}

	get address_number(): string {
		return this._address_number
	}

	get avatar(): string {
		return this._avatar
	}

	get cep(): string {
		return this._cep
	}

	get city(): string {
		return this._city
	}

	get cnaes(): string {
		return this._cnaes
	}

	get complement(): string {
		return this._complement
	}

	get country(): string {
		return this._country
	}

	get name_company(): string {
		return this._name_company
	}

	get neighborhood(): string {
		return this._neighborhood
	}

	get obs(): string {
		return this._obs
	}

	get phones(): Nullable<{ value: string; id: number }>[] {
		return this._phones
	}

	get site(): string {
		return this._site
	}

	get state(): string {
		return this._state
	}

	get revenue_reports(): { [key: number]: IBilling } {
		return this._revenue_reports
	}

	get holidays(): IHoliday[] {
		return this._holidays
	}

	private constructor() {
		super()
	}

	defineName(name = ''): this {
		this._name = name
		return this
	}

	defineFranchise(franchised = false): this {
		this._franchise = franchised
		return this
	}

	defineIsCompany(is_company = true): this {
		this._is_company = is_company
		return this
	}

	defineDocument(document = '', force = false): this {
		const numbers = document.replace(/\D/g, '')
		this._document = Document.build(numbers, force).value
		return this
	}

	defineDateExpiration(date_expiration = addDays(new Date(), 5)): this {
		this._date_expiration = date_expiration
		return this
	}

	defineActive(active = false): this {
		this._active = active
		return this
	}

	defineEmail(email = ''): this {
		this._email = Email.build(email).value
		return this
	}

	defineAddress(address = ''): this {
		this._address = address
		return this
	}

	defineAddressNumber(address_number = ''): this {
		this._address_number = address_number
		return this
	}

	defineAvatar(avatar = ''): this {
		this._avatar = avatar
		return this
	}

	defineCep(cep = ''): this {
		this._cep = cep
		return this
	}

	defineCity(city = ''): this {
		this._city = city
		return this
	}

	defineCnaes(cnaes = ''): this {
		this._cnaes = cnaes
		return this
	}

	defineComplement(complement = ''): this {
		this._complement = complement
		return this
	}

	defineCountry(country = ''): this {
		this._country = country
		return this
	}

	defineNameCompany(name_company = ''): this {
		this._name_company = name_company
		return this
	}

	defineNeighborhood(neighborhood = ''): this {
		this._neighborhood = neighborhood
		return this
	}

	defineObs(obs = ''): this {
		this._obs = obs
		return this
	}

	definePhones(phones: Nullable<{ value: string; id: number }>[] = []): this {
		this._phones = phones
		return this
	}

	defineSite(site = ''): this {
		this._site = site
		return this
	}

	defineState(state = ''): this {
		this._state = state
		return this
	}

	defineRevenueReports(revenue_reports: { [key: number]: IBilling } = {}): this {
		this._revenue_reports = revenue_reports
		return this
	}

	defineHolidays(holidays: IHoliday[] = []): this {
		this._holidays = holidays
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
				.defineFranchise(params.franchised)
				.defineCreatedAt(params.created_at)
				.defineUpdatedAt(params.updated_at)

			await validateSchema.parseAsync(unity)

			return right(unity)
		} catch (error) {
			return left(error as any)
		}
	}
}
