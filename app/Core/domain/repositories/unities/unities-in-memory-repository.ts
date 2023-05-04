import { faker } from '@faker-js/faker'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import { IUnity } from 'Types/IUnity'
import { cnpj } from 'cpf-cnpj-validator'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { UnitiesManagerInterface } from '../interface/unities-manager.interface'

const fabricateUnity = (qtd: number): IUnity[] => {
	return Array(qtd)
		.fill(0)
		.map((_, index) => ({
			_id: `63528c11c109b232759921d${index}`,
			name: faker.name.fullName(),
			active: faker.datatype.boolean(),
			created_at: faker.date.past(),
			avatar: faker.image.avatar(),
			city: faker.address.city(),
			address: faker.address.streetAddress(),
			address_number: faker.datatype.number().toString(),
			cep: faker.address.zipCode(),
			country: faker.address.country(),
			date_expiration: faker.date.future(),
			is_company: faker.datatype.boolean(),
			email: faker.internet.email(),
			site: faker.internet.url(),
			state: faker.address.state(),
			updated_at: faker.date.past(),
			obs: faker.lorem.paragraph(),
			phone: faker.phone.number(),
			complement: faker.lorem.paragraph(),
			document: cnpj.generate(),
			name_company: faker.company.name(),
			neighbohood: faker.address.county(),
			cnaes: '',
			phones: [],
		}))
}

export class UnitiesInMemoryRepository implements UnitiesManagerInterface {
	private items: IUnity[] = []

	constructor() {
		this.items = fabricateUnity(10)
	}
  
  public async findByName(
		name: string,
	): PromiseEither<AbstractError, IUnity[]> {
		return right(this.items);
  }
    
	public async findAll(): PromiseEither<AbstractError, IUnity[]> {
		return right(this.items)
	}

	public async findById(id: string): PromiseEither<AbstractError, IUnity> {
		const unity = this.items.find((item) => item._id === id)

		if (!unity) {
			return left(new UnitNotFoundError())
		}

		return right(unity)
	}

	public async findOne(id: string): PromiseEither<AbstractError, IUnity> {
		const unity = this.items.find((item) => item._id === id)

		if (!unity) {
			return left(new UnitNotFoundError())
		}

		return right(unity)
	}
}
