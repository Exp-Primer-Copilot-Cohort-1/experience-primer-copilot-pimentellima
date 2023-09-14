/* eslint-disable @typescript-eslint/naming-convention */
import { ObjectId } from '@ioc:Mongoose'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IAccount } from 'App/Types/IAccount'
import { InvalidParamsError } from '../../errors/invalid-params-error'
import { Entity } from '../abstract/entity.abstract'

export class AccountEntity extends Entity implements IAccount {
	private _name: string
	private _cash: number
	private _date: Date
	private _bank: string
	private _active: boolean
	private _unity_id: ObjectId | string
	private _description?: string
	private _user_id?: ObjectId | string

	private constructor() {
		super()
	}

	public get name(): string {
		return this._name
	}

	public get cash(): number {
		return this._cash
	}

	public get date(): Date {
		return this._date
	}

	public get bank(): string {
		return this._bank
	}

	public get active(): boolean {
		return this._active
	}

	public get unity_id(): ObjectId | string {
		return this._unity_id
	}

	public get description(): string | undefined {
		return this._description
	}

	public get user_id(): ObjectId | string | undefined {
		return this._user_id
	}

	defineName(name: string): AccountEntity {
		this._name = name
		return this
	}
	defineCash(value: number): AccountEntity {
		this._cash = value
		return this
	}
	defineDate(date: Date): AccountEntity {
		this._date = date
		return this
	}
	defineBank(bank: string): AccountEntity {
		this._bank = bank
		return this
	}
	defineActive(active: boolean): AccountEntity {
		this._active = active
		return this
	}
	defineUnityId(unity_id: string | ObjectId): AccountEntity {
		this._unity_id = unity_id
		return this
	}
	defineDescription(description?: string): AccountEntity {
		this._description = description
		return this
	}
	defineUserId(user_id?: string | ObjectId): AccountEntity {
		this._user_id = user_id
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
					.defineUnityId(params.unity_id)
					.defineDescription(params.description)
					.defineUserId(params.user_id),
			)
		} catch (err) {
			return left(new InvalidParamsError(err))
		}
	}
}

export default AccountEntity
