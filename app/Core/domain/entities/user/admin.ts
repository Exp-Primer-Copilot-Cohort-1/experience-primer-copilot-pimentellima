import { PromiseEither, left, right } from 'App/Core/shared';
import { IAdminUser } from 'Types/IAdminUser';

class AdminUser implements IAdminUser {
	public _id: string;
	public is_company: boolean;
	public unity_id: string;
	public name: string;
	public date_expiration: string;
	public password: string;
	public email: string;
	public document: string;
	public celphone: string;
	public type: 'admin' | 'admin_prof';
	public active: boolean;

	private constructor() { }

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
		this.email = email;
		return this;
	}

	public definePassword(password: string): this {
		this.password = password;
		return this;
	}

	public defineUnityId(unity_id: string): this {
		this.unity_id = unity_id;
		return this;
	}

	public defineType(type: 'admin' | 'admin_prof'): this {
		this.type = type;
		return this;
	}

	public defineActive(active: boolean = false): this {
		this.active = active;
		return this;
	}

	public defineIsCompany(is_company: boolean = false): this {
		this.is_company = is_company;
		return this;
	}

	public defineDateExpiration(date_expiration: string): this {
		this.date_expiration = date_expiration;
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

	public params(): IAdminUser {
		return Object.assign({}, this);
	}

	public static async build(
		admin: IAdminUser,
	): PromiseEither<Error, AdminUser> {
		try {
			return right(
				new AdminUser()
					.defineId(admin._id?.toString())
					.defineName(admin.name)
					.defineEmail(admin.email)
					.defineIsCompany(admin.is_company)
					.defineDateExpiration(admin.date_expiration)
					.defineDocument(admin.document)
					.defineCelphone(admin.celphone)
					.definePassword(admin.password)
					.defineUnityId(admin.unity_id)
					.defineType(admin.type)
					.defineActive(admin.active),
			);
		} catch (error) {
			return left(error);
		}
	}
}

export default AdminUser;
