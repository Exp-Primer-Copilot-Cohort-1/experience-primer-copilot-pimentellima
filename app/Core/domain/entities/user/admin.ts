import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither, left, right } from 'App/Core/shared';
import { IAdminUser } from 'Types/IAdminUser';
import { SystemUser } from '../abstract/system-user.abstract';

class AdminUser extends SystemUser implements IAdminUser {
	public is_company: boolean;
	public type: 'admin' | 'admin_prof';

	private constructor() {
		super();
	}

	public defineType(type: 'admin' | 'admin_prof'): this {
		this.type = type;
		return this;
	}

	public defineIsCompany(is_company: boolean = false): this {
		this.is_company = is_company;
		return this;
	}

	public params(): AdminUser {
		const admin = Object.assign({}, this);

		return {
			...admin,
			email: this.email,
			document: this.document,
		};
	}

	public static async build(
		admin: IAdminUser,
	): PromiseEither<AbstractError, AdminUser> {
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
					.defineDayOfTrade(admin.dayOfTrade)
					.defineActive(admin.active),
			);
		} catch (error) {
			return left(error);
		}
	}
}

export default AdminUser;
