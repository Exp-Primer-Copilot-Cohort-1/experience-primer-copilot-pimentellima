import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Session extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public email: string

	@column({ serializeAs: null })
	public password: string

	@column()
	public rememberMeToken: string | null

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	@beforeSave()
	public static async hashPassword(session: Session) {
		if (session.$dirty.password) {
			session.password = await Hash.make(session.password)
		}
	}
}
