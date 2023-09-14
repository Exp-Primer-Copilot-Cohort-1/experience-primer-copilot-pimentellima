import type { ProviderUserContract, UserProviderContract } from '@ioc:Adonis/Addons/Auth'
import type { HashContract } from '@ioc:Adonis/Core/Hash'

import User from 'App/Models/User'
import { IUser } from 'App/Types/IUser'

/**
 * The shape of configuration accepted by the MongoDbAuthProvider.
 * At a bare minimum, it needs a driver property
 */
export type MongoDbAuthProviderConfig = {
	driver: 'mongo'
}

/**
 * Provider user works as a bridge between your User provider and
 * the AdonisJS auth module.
 */
class ProviderUser implements ProviderUserContract<IUser> {
	constructor(public user: IUser | null, private hash: HashContract) { }

	public getId() {
		return this.user ? this.user._id : null
	}

	public getRememberMeToken(): string | null {
		return this.user?.rememberMeToken || null
	}

	public setRememberMeToken(token: string) {
		if (!this.user) {
			return
		}
		this.user.rememberMeToken = token
	}

	public async verifyPassword(plainPassword: string) {
		if (!this.user) {
			throw new Error('Cannot verify password for non-existing user')
		}

		return this.hash.verify(this.user.password, plainPassword)
	}
}

/**
 * The User provider implementation to lookup a user for different
 * operations
 */
export class MongoDbAuthProvider implements UserProviderContract<IUser> {
	constructor(public config: MongoDbAuthProviderConfig, private hash: HashContract) { }

	public async getUserFor(user: IUser | null) {
		return new ProviderUser(user, this.hash)
	}

	public async updateRememberMeToken(user: ProviderUser) {
		await User.updateOne(
			{ _id: user.getId() },
			{ rememberMeToken: user.getRememberMeToken() },
		)
	}

	public async findById(id: string | number) {
		const user = await User.findById(id)
		return this.getUserFor(user)
	}

	public async findByUid(uidValue: string) {
		const user = await User.findOne().where('email').equals(uidValue)
		return this.getUserFor(user || null)
	}

	public async findByRememberMeToken(userId: string | number, token: string) {
		const user = await User.findOne()
			.where('_id')
			.equals(userId)
			.where('rememberMeToken')
			.equals(token)

		return this.getUserFor(user)
	}
}
