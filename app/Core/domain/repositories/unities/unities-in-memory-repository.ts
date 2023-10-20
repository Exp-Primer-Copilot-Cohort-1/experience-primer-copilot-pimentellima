import { faker } from '@faker-js/faker'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import { IUnity } from 'App/Types/IUnity'
import { cnpj } from 'cpf-cnpj-validator'
import { UnityNotFoundError } from '../../errors/unity-not-found'
import { UnitiesManagerInterface } from '../interface/unities-manager.interface'

const fabricateUnity = (qtd: number): IUnity[] => {
	return Array(qtd)
		.fill(0)
		.map((_, index) => ({
			_id: `63528c11c109b232759921d${index}`,
			franchised: false,
			name: faker.person.fullName(),
			active: faker.datatype.boolean(),
			created_at: faker.date.past(),
			avatar: faker.image.avatar(),
			city: faker.location.city(),
			address: faker.location.streetAddress(),
			address_number: faker.number.int().toString(),
			cep: faker.location.zipCode(),
			country: faker.location.country(),
			date_expiration: faker.date.future(),
			is_company: faker.datatype.boolean(),
			email: faker.internet.email(),
			site: faker.internet.url(),
			state: faker.location.state(),
			updated_at: faker.date.past(),
			obs: faker.lorem.paragraph(),
			phone: faker.phone.number(),
			complement: faker.lorem.paragraph(),
			document: cnpj.generate(),
			name_company: faker.company.name(),
			neighborhood: faker.location.county(),
			cnaes: '',
			phones: [],
		}))
}

export class UnitiesInMemoryRepository implements UnitiesManagerInterface {
	public items: IUnity[] = []

	constructor() {
		this.items = fabricateUnity(10)
	}
	update: (id: string, data: Partial<IUnity>) => PromiseEither<AbstractError, IUnity>

	public async findByName(name: string): PromiseEither<AbstractError, IUnity[]> {
		return right(this.items)
	}

	public async findAll(): PromiseEither<AbstractError, IUnity[]> {
		return right(this.items)
	}
	public async findById(id: string): PromiseEither<AbstractError, IUnity> {
		const unity = this.items.find((item) => item._id === id)

		if (!unity) {
			return left(new UnityNotFoundError())
		}

		return right(unity)
	}
	public async updateUnitiesById(id: string): PromiseEither<AbstractError, IUnity> {
		const unity = this.items.find((item) => item._id === id)

		if (!unity) {
			return left(new UnityNotFoundError())
		}

		return right(unity)
	}

	public async findOne(id: string): PromiseEither<AbstractError, IUnity> {
		const unity = this.items.find((item) => item._id === id)

		if (!unity) {
			return left(new UnityNotFoundError())
		}

		return right(unity)
	}
	public async deleteById(id: string): PromiseEither<AbstractError, IUnity> {
		const unity = this.items.find((item) => item._id === id)

		if (!unity) {
			return left(new UnityNotFoundError())
		}

		return right(unity)
	}
	public async create(unity: IUnity): PromiseEither<AbstractError, IUnity> {
		const created = {
			...unity,
			_id: faker.string.uuid(),
		}

		this.items.push(created)
		return right(created)
	}
}
