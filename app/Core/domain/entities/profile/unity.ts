import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IProfileUnity, IUnity } from 'App/Types/IUnity'
import { addDays } from 'date-fns'
import { Entity } from '../abstract/entity.abstract'

import { validateUnity } from './validations'

export class ProfileUnityEntity extends Entity implements IProfileUnity {
	name: string
	is_company: boolean
	date_expiration: Date
	active: boolean
	street: string
	address_number: string
	avatar: string
	cep: string
	city: string
	cnaes: string
	complement: string
	country: string
	neighborhood: string
	obs: string
	phones: Nullable<{ value: string; id: number }>[]
	site: string
	state: string


	private constructor() {
		super()
	}

	defineName(name = ''): this {
		this.name = name
		return this
	}

	defineIsCompany(is_company = true): this {
		this.is_company = is_company
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

	defineStreet(street = ''): this {
		this.street = street
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

	static async build(params: IUnity): PromiseEither<AbstractError, ProfileUnityEntity> {
		try {
			const unity = new ProfileUnityEntity()
				.defineId(params._id?.toString() || '')
				.defineActive(params.active)
				.defineStreet(params.street)
				.defineAddressNumber(params.address_number)
				.defineAvatar(params.avatar)
				.defineCep(params.cep)
				.defineCity(params.city)
				.defineCnaes(params.cnaes)
				.defineComplement(params.complement)
				.defineCountry(params.country)
				.defineDateExpiration(params.date_expiration)
				.defineIsCompany(params.is_company)
				.defineName(params.name)
				.defineNeighborhood(params.neighborhood)
				.defineObs(params.obs)
				.definePhones(params.phones)
				.defineSite(params.site)
				.defineState(params.state)
				.defineCreatedAt(params.created_at)
				.defineUpdatedAt(params.updated_at)

			await validateUnity().parseAsync(unity)

			return right(unity)
		} catch (error) {
			return left(error as any)
		}
	}
}
