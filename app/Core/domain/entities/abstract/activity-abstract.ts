import { PaymentStatus } from 'App/Helpers'

import { IAbstractActivity, Procedure } from 'App/Types/IActivity'
import { Generic } from 'App/Types/ITransaction'
import { Entity } from './entity.abstract'

export interface IProcedureOut {
	_id: string
	minutes: number
	color: string
	price: number
	health_insurance: string
}

export abstract class AbstractActivity extends Entity implements IAbstractActivity {
	status: PaymentStatus
	procedures: IProcedureOut[]
	is_recurrent: boolean
	client: string
	obs?: string
	prof: string
	active: boolean
	unity_id: string
	group_id: string

	public defineStatus(status = PaymentStatus.PENDING): this {
		this.status = status
		return this
	}

	public defineProcedures(procedures: Procedure[]): this {
		this.procedures = procedures?.map((procedure) => {
			let h = ''

			if (typeof procedure.health_insurance === 'object') {
				const value = procedure.health_insurance['value']

				h = value ? value : procedure.health_insurance.toString()
			}

			h = procedure.health_insurance.toString()

			return {
				_id: procedure._id.toString(),
				minutes: procedure.minutes,
				color: procedure.color,
				price: procedure.price,
				health_insurance: h,
			}
		})
		return this
	}

	public defineClient(client: string | Generic): this {
		this.client = typeof client === 'string' ? client.toString() : client.value.toString()
		return this
	}

	public defineObs(obs = ''): this {
		this.obs = obs
		return this
	}

	public defineProf(prof: string | Generic): this {
		this.prof = typeof prof === 'string' ? prof.toString() : prof.value.toString()
		return this
	}

	public defineActive(active: boolean = true): this {
		this.active = active
		return this
	}

	public defineUnityId(unity_id: string): this {
		this.unity_id = unity_id
		return this
	}

	public defineGroupId(group_id: string): this {
		this.group_id = group_id
		return this
	}

	public defineIsRecurrent(is_recurrent: boolean = false): this {
		if (this.group_id) is_recurrent = true

		this.is_recurrent = is_recurrent
		return this
	}
}
