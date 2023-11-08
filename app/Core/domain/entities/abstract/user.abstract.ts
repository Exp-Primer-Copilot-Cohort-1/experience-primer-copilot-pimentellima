/* eslint-disable no-unreachable */
import { ROLES } from 'App/Roles/types'
import Document from '../validations/document'
import Email from '../validations/email'
import { Entity } from './entity.abstract'

export abstract class AbstractUser extends Entity {
	unity_id: string
	name: string
	celphone: string
	type: ROLES
	avatar: string
	email: string
	document: string
	blacklist: string[]
	permissions: string[]

	public defineName(name: string): this {
		this.name = name
		return this
	}

	public defineEmail(email: string | Email): this {
		if (email instanceof Email) {
			this.email = email.value
			return this
		}

		this.email = Email.build(email).value
		return this
	}

	public defineUnityId(unity_id = ''): this {
		if (!unity_id) {
			throw new Error('Unity id is required')
		}

		this.unity_id = unity_id
		return this
	}

	public defineType(type: ROLES): this {
		this.type = type
		return this
	}

	public defineDocument(document: string | Document): this {
		if (document instanceof Document) {
			this.document = document.value
			return this
		}

		this.document = Document.build(document).value
		return this
	}

	public defineCelphone(celphone: string): this {
		this.celphone = celphone
		return this
	}

	public defineAvatar(avatar?: string): this {
		this.avatar = avatar || ''
		return this
	}

	public defineBlacklist(blackListPermissions: string[] = []): this {
		this.blacklist = blackListPermissions
		return this
	}

	public definePermissions(permissions: string[] = []): this {
		this.permissions = permissions
		return this
	}
}
