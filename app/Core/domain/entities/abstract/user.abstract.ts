/* eslint-disable no-unreachable */
import Document from '../validations/document'
import Email from '../validations/email'
import { Entity } from './entity.abstract'

export abstract class AbstractUser extends Entity {
	private _unity_id: string
	private _name: string
	private _celphone: string
	protected _type: 'admin' | 'admin_prof' | 'prof' | 'client' | 'sec'
	private _avatar: string
	private _email: Email
	private _document: Document
	private _blackListPermissions: string[]
	private _blackListScreens: string[]
	private _permissions: string[]
	private _screens: string[]

	public get blackListPermissions(): string[] {
		return this._blackListPermissions
	}

	public get blackListScreens(): string[] {
		return this._blackListScreens
	}

	public get permissions(): string[] {
		return this._permissions
	}

	public get screens(): string[] {
		return this._screens
	}

	public get email(): string {
		return this._email?.value
	}

	public get document(): string {
		return this._document?.value
	}

	public get unity_id(): string {
		return this._unity_id
	}

	public get name(): string {
		return this._name
	}

	public get celphone(): string {
		return this._celphone
	}

	public get type(): 'admin' | 'admin_prof' | 'prof' | 'client' | 'sec' {
		return this._type
	}

	public get avatar(): string {
		return this._avatar
	}

	public defineName(name: string): this {
		this._name = name
		return this
	}

	public defineEmail(email: string | Email): this {
		if (email instanceof Email) {
			this._email = email
			return this
		}

		this._email = Email.build(email)
		return this
	}

	public defineUnityId(unity_id = ''): this {
		if (!unity_id) {
			throw new Error('Unity id is required')
		}

		this._unity_id = unity_id
		return this
	}

	public defineType(type: 'admin' | 'admin_prof' | 'prof' | 'client' | 'sec'): this {
		this._type = type
		return this
	}

	public defineDocument(document: string | Document): this {
		if (document instanceof Document) {
			this._document = document
			return this
		}

		this._document = Document.build(document)
		return this
	}

	public defineCelphone(celphone: string): this {
		this._celphone = celphone
		return this
	}

	public defineAvatar(avatar: string): this {
		this._avatar = avatar
		return this
	}

	public defineBlackListPermissions(blackListPermissions: string[] = []): this {
		this._blackListPermissions = blackListPermissions
		return this
	}

	public defineBlackListScreens(blackListScreens: string[] = []): this {
		this._blackListScreens = blackListScreens
		return this
	}

	public definePermissions(permissions: string[] = []): this {
		this._permissions = permissions
		return this
	}

	public defineScreens(screens: string[] = []): this {
		this._screens = screens
		return this
	}
}
