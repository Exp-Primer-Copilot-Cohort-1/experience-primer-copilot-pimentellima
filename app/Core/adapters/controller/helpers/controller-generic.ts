/* eslint-disable no-unused-vars */
import {
	HttpRequest,
	HttpResponse,
} from 'App/Core/adapters/controller/ports/http';

export interface ControllerGeneric {
	handle: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}
