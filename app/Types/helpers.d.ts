export { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

type Nullable<T> = {
	[P in keyof T]: T[P] | null
}

type Message = {
	message: string
}