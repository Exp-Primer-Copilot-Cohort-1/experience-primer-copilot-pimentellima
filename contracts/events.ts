/**
 * Contract source: https://git.io/JfefG
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

import { ISessionTransaction } from "App/Core/infra/session-transaction";
import { IAdminUser } from "App/Types/IAdminUser";
import { IUnity } from "App/Types/IUnity";

declare module '@ioc:Adonis/Core/Event' {
	interface EventsList {
		'new:user': { id: string; email: string, label?: string, name?: string };
		'new:password': { password: string; email: string };
		'new:unity': { unity: IUnity, user: IAdminUser, session: ISessionTransaction }
		'new:reply-form-standard-franchise': { group_id: string; }
	}
}
