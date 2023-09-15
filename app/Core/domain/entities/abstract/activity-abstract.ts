import { PaymentStatus } from 'App/Helpers'

import { IAbstractActivity, Procedure } from 'App/Types/IActivity'
import { Generic } from 'App/Types/ITransaction'
import { Entity } from './entity.abstract'

export abstract class AbstractActivity extends Entity implements IAbstractActivity {
	status: PaymentStatus
	procedures: Procedure[]
	client: string
	obs?: string
	prof: string
	active: boolean
	unity_id: string

	public defineStatus(status: PaymentStatus): this {
		this.status = status
		return this
	}

	public defineProcedures(procedures: Procedure[]): this {
		this.procedures = procedures
		return this
	}

	public defineClient(client: string | Generic): this {
		if (typeof client === 'object') {
			this.client = client.value
			return this
		}
		this.client = client
		return this
	}

	public defineObs(obs?: string): this {
		this.obs = obs
		return this
	}

	public defineProf(prof: string | Generic): this {
		if (typeof prof === 'object') {
			this.prof = prof.value
			return this
		}
		this.prof = prof
		return this
	}

	public defineActive(active: boolean): this {
		this.active = active
		return this
	}

	public defineUnityId(unity_id: string): this {
		this.unity_id = unity_id
		return this
	}
}
