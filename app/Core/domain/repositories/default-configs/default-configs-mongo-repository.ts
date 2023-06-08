import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import DefaultConfig from 'App/Models/DefaultConfig'
import { IDefaultConfig } from 'Types/IDefaultConfig'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { DefaultConfigsManagerInterface } from '../interface'

export class DefaultConfigsMongooseRepository implements DefaultConfigsManagerInterface {
	constructor() { }
	public async createDefaultConfigs(
		data,
	): PromiseEither<AbstractError, IDefaultConfig> {
		const configs = await DefaultConfig.create({
			...data,
		})
		return right(configs)
	}

	public async findByUnity(
		unity_id: string,
	): PromiseEither<AbstractError, IDefaultConfig[]> {
		const configs = await DefaultConfig.find({
			unity_id: unity_id,
		})
		if (!configs) {
			return left(new UnitNotFoundError())
		}
		return right(configs)
	}
	async findById(id: string): PromiseEither<AbstractError, IDefaultConfig> {
		const configs = await DefaultConfig.findById(id)
		if (!configs) {
			return left(new UnitNotFoundError())
		}
		return right(configs)
	}
	public async deleteDefaultConfigsById(
		id: string,
	): PromiseEither<AbstractError, IDefaultConfig> {
		const configs = await DefaultConfig.findById(id)
		if (!configs) {
			return left(new UnitNotFoundError())
		}
		await configs.remove()
		return right(configs)
	}
	public async updateDefaultConfigsById(
		id: string,
		data: Partial<IDefaultConfig>,
	): PromiseEither<AbstractError, IDefaultConfig> {
		const configs = await DefaultConfig.findByIdAndUpdate(id, data)
		if (!configs) {
			return left(new UnitNotFoundError())
		}
		return right(configs)
	}
}
