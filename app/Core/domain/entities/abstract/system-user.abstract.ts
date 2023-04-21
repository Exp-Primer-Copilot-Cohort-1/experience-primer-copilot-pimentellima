import { IDaysOffice } from 'Types/IDaysOffice';
import DaysOfTrade from '../helpers/days-of-trade';
import { AbstractUser } from './user.abstract';

abstract class SystemUser extends AbstractUser {
	public date_expiration: string;
	public password: string;
	public type: 'admin' | 'admin_prof' | 'prof' | 'sec';
	public active: boolean;
	public dayOfTrade: DaysOfTrade;

	public defineDateExpiration(date_expiration: string): this {
		this.date_expiration = date_expiration;
		return this;
	}

	public definePassword(password: string): this {
		this.password = password;
		return this;
	}

	public defineType(type: 'admin' | 'admin_prof' | 'prof' | 'sec'): this {
		this.type = type;
		return this;
	}

	public defineActive(active: boolean = false): this {
		this.active = active;
		return this;
	}

	public defineDayOfTrade(dayOfTrade: IDaysOffice): this {
		if (!dayOfTrade) {
			return this;
		}

		this.dayOfTrade = DaysOfTrade.build(dayOfTrade);
		return this;
	}
}

export { SystemUser };
