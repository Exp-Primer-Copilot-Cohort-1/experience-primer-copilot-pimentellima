/* eslint-disable @typescript-eslint/naming-convention */
import { InvalidParamsError } from 'App/Core/domain/errors/invalid-params-error'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ROLES } from 'App/Roles/types'
import { Genders } from 'App/Types/IClient'
import { Generic } from 'App/Types/ITransaction'
import { IProfile } from 'App/Types/IUser'
import { Entity } from '../abstract/entity.abstract'
import validation from './validations'

export class ProfileEntity extends Entity implements IProfile {
	name: string
	active: boolean
	avatar: string
	phone: string
	celphone: string
	unity_id: string
	performs_medical_appointments?: boolean
	gender: Genders
	record: string
	profession: string
	occupation_code: string
	show_lack: boolean

	private constructor() {
		super()
	}

	defineName(name: string): this {
		this.name = name
		return this
	}

	defineActive(active: boolean): this {
		this.active = active
		return this
	}

	defineAvatar(avatar: string): this {
		this.avatar = avatar
		return this
	}

	definePhone(phone: string): this {
		this.phone = phone
		return this
	}

	defineCelphone(celphone: string): this {
		this.celphone = celphone
		return this
	}

	defineUnityId(unity_id: string): this {
		this.unity_id = unity_id
		return this
	}

	definePerformsMedicalAppointments(
		performs_medical_appointments: boolean = false,
		type?: ROLES
	): this {
		const roles = [
			ROLES.FRANCHISEE_ADMIN,
			ROLES.SUPERADMIN
		]

		if (type && roles.includes(type)) {
			this.performs_medical_appointments = performs_medical_appointments
		}

		return this
	}

	defineGender(gender: Genders | Generic = Genders.not_informed): this {
		this.gender = typeof gender === 'string' ? gender : gender.value as Genders
		return this
	}

	defineRecord(record: string): this {
		this.record = record
		return this
	}

	defineProfession(profession: string): this {
		this.profession = profession
		return this
	}

	defineOccupationCode(occupation_code: string): this {
		this.occupation_code = occupation_code
		return this
	}

	defineShowLack(show_lack: boolean): this {
		this.show_lack = show_lack
		return this
	}


	public static async build(
		params: IProfile,
	): PromiseEither<AbstractError, ProfileEntity> {
		try {
			const profile = new ProfileEntity()
				.defineId(params._id?.toString())
				.defineName(params.name)
				.defineActive(params.active)
				.defineAvatar(params.avatar)
				.definePhone(params.phone)
				.defineCelphone(params.celphone)
				.defineUnityId(params.unity_id.toString())
				.definePerformsMedicalAppointments(params.performs_medical_appointments, params.type)
				.defineGender(params.gender)
				.defineRecord(params.record)
				.defineProfession(params.profession)
				.defineOccupationCode(params.occupation_code)
				.defineShowLack(params.show_lack)

			validation().parse(profile)

			return right(profile)
		} catch (err) {
			return left(new InvalidParamsError(err))
		}
	}
}

export default ProfileEntity
