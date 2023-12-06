/* eslint-disable @typescript-eslint/naming-convention */
import { InvalidParamsError } from 'App/Core/domain/errors/invalid-params-error'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IAccount } from 'App/Types/IAccount'
import { Generic } from 'App/Types/ITransaction'
import { Entity } from '../abstract/entity.abstract'
/**
 * Classe que representa uma conta.
 */
export class AccountEntity extends Entity implements IAccount {
	/**
	 * Nome da conta.
	 */
	name: string
	/**
	 * Valor em dinheiro da conta.
	 */
	cash: number
	/**
	 * Data da conta.
	 */
	date: Date
	/**
	 * Nome do banco da conta.
	 */
	bank: string
	/**
	 * Indica se a conta está ativa.
	 */
	active: boolean
	/**
	 * ID da unidade da conta.
	 */
	unity_id: string
	/**
	 * Descrição da conta.
	 */
	description?: string
	/**
	 * ID do usuário da conta.
	 */
	user?: string

	private constructor() {
		super()
	}

	/**
	 * Define o nome da conta.
	 * @param name Nome da conta.
	 * @returns A instância da entidade de conta.
	 */
	defineName(name: string): AccountEntity {
		this.name = name
		return this
	}

	/**
	 * Define o valor em dinheiro da conta.
	 * @param cash Valor em dinheiro da conta.
	 * @returns A instância da entidade de conta.
	 */
	defineCash(cash: number | string): AccountEntity {
		if (typeof cash === 'string') {
			cash = parseFloat(cash.replace(',', '.'))
		}

		this.cash = cash
		return this
	}

	/**
	 * Define a data da conta.
	 * @param date Data da conta.
	 * @returns A instância da entidade de conta.
	 */
	defineDate(date: Date): AccountEntity {
		this.date = date
		return this
	}

	/**
	 * Define o nome do banco da conta.
	 * @param bank Nome do banco da conta.
	 * @returns A instância da entidade de conta.
	 */
	defineBank(bank: string | Generic): AccountEntity {
		this.bank = typeof bank === 'string' ? bank : bank.value
		return this
	}

	/**
	 * Define se a conta está ativa.
	 * @param active Indica se a conta está ativa.
	 * @returns A instância da entidade de conta.
	 */
	defineActive(active: boolean): AccountEntity {
		this.active = active
		return this
	}

	/**
	 * Define o ID da unidade da conta.
	 * @param unity_id ID da unidade da conta.
	 * @returns A instância da entidade de conta.
	 */
	defineUnityId(unity_id: string): AccountEntity {
		this.unity_id = unity_id
		return this
	}

	/**
	 * Define a descrição da conta.
	 * @param description Descrição da conta.
	 * @returns A instância da entidade de conta.
	 */
	defineDescription(description?: string): AccountEntity {
		this.description = description
		return this
	}

	/**
	 * Define o ID do usuário da conta.
	 * @param user_id ID do usuário da conta.
	 * @returns A instância da entidade de conta.
	 */
	defineUserId(user_id?: string): AccountEntity {
		this.user = user_id
		return this
	}

	/**
	 * Constrói uma instância da entidade de conta.
	 * @param params Parâmetros para construção da entidade de conta.
	 * @returns Um objeto Either contendo a entidade de conta ou um erro.
	 */
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
					.defineUserId(params.user as string),
			)
		} catch (err) {
			return left(new InvalidParamsError(err))
		}
	}
}

export default AccountEntity
