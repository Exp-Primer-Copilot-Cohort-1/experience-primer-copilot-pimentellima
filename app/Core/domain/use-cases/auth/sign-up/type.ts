import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { ROLES } from 'App/Roles/types'

export type Password = { password: string }

export type CreatePasswordProps = {
	password?: string
	email: string
	type: ROLES
}


export type ICreatePasswordUseCase = UseCase<CreatePasswordProps, Password>