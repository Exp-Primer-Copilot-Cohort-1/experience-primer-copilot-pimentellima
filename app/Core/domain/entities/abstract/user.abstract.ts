import ValidateEmail from '../validations/email';

abstract class AbstractUser {
	public _id: string;
	public unity_id: string;
	public name: string;
	public email: string;
	public document: string;
	public celphone: string;
	public type: 'admin' | 'admin_prof' | 'prof' | 'client' | 'sec';
	public avatar: string;
	public created_at: Date;
	public updated_at: Date;

	constructor() { }

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

	public defineEmail(email: string): this {
		this.email = ValidateEmail.build(email).email;
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

	public defineDocument(document: string): this {
		this.document = document;
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
