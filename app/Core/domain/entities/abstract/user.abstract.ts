import Document from '../validations/document';
import Email from '../validations/email';

abstract class AbstractUser {
	public _id: string;
	public unity_id: string;
	public name: string;

	public celphone: string;
	public type: 'admin' | 'admin_prof' | 'prof' | 'client' | 'sec';
	public avatar: string;
	public created_at: Date;
	public updated_at: Date;

	private _email: Email;
	private _document: Document;

	constructor() { }

	public get email(): string {
		return this._email?.value;
	}

	public get document(): string {
		return this._document?.value;
	}

	public defineId(id: string): this {
		if (!id) {
			return this;
		}

		this._id = id;
		return this;
	}

	public defineName(name: string): this {
		this.name = name;
		return this;
	}

	public defineEmail(email: string | Email): this {
		if (email instanceof Email) {
			this._email = email;
			return this;
		}

		this._email = Email.build(email);
		return this;
	}

	public defineUnityId(unity_id: string): this {
		this.unity_id = unity_id;
		return this;
	}

	public defineType(
		type: 'admin' | 'admin_prof' | 'prof' | 'client' | 'sec',
	): this {
		this.type = type;
		return this;
	}

	public defineDocument(document: string | Document): this {
		if (document instanceof Document) {
			this._document = document;
			return this;
		}

		this._document = Document.build(document);
		return this;
	}

	public defineCelphone(celphone: string): this {
		this.celphone = celphone;
		return this;
	}

	public defineAvatar(avatar: string): this {
		this.avatar = avatar;
		return this;
	}

	public defineCreatedAt(created_at: Date): this {
		this.created_at = created_at;
		return this;
	}

	public defineUpdatedAt(updated_at: Date): this {
		this.updated_at = updated_at;
		return this;
	}
}

export { AbstractUser };
