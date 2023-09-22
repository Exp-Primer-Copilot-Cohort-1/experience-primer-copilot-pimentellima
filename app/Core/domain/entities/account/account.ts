/* eslint-disable @typescript-eslint/naming-convention */
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IAccount } from 'App/Types/IAccount'
import { Generic } from 'App/Types/ITransaction'
import { InvalidParamsError } from '../../errors/invalid-params-error'
import { Entity } from '../abstract/entity.abstract'

export class AccountEntity extends Entity implements IAccount {
	name: string
	cash: number
	date: Date
	bank: string
	active: boolean
	unity_id: string
	description?: string
	user_id?: string

	private constructor() {
		super()
	}

	defineName(name: string): AccountEntity {
		this.name = name
		return this
	}
	defineCash(value: number): AccountEntity {
		this.cash = value
		return this
	}
	defineDate(date: Date): AccountEntity {
		this.date = date
		return this
	}
	defineBank(bank: string | Generic): AccountEntity {
		this.bank = typeof bank === 'string' ? bank : bank.value
		return this
	}
	defineActive(active: boolean): AccountEntity {
		this.active = active
		return this
	}
	defineUnityId(unity_id: string): AccountEntity {
		this.unity_id = unity_id
		return this
	}
	defineDescription(description?: string): AccountEntity {
		this.description = description
		return this
	}
	defineUserId(user_id?: string): AccountEntity {
		this.user_id = user_id
		return this
	}

	public static async build(
		params: IAccount,
	): PromiseEither<AbstractError, AccountEntity> {
		try {
			return right(
				new AccountEntity()
					.defineId(params._id?.toString())
					.defineName(params.name)
					.defineCash(params.cash)
					.defineDate(params.date)
					.defineBank(params.bank)
					.defineActive(params.active)
					.defineUnityId(params.unity_id as string)
					.defineDescription(params.description)
					.defineUserId(params.user_id as string),
			)
		} catch (err) {
			return left(new InvalidParamsError(err))
		}
	}
}

export default AccountEntity
