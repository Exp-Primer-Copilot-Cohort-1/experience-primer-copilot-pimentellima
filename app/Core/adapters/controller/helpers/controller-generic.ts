/* eslint-disable no-unused-vars */
import { HttpRequest, HttpResponse } from 'App/Core/adapters/controller/ports/http'
import { IUser } from 'Types/IUser'

export interface ControllerGeneric {
	handle: (httpRequest: HttpRequest, user?: IUser) => Promise<HttpResponse>
}
