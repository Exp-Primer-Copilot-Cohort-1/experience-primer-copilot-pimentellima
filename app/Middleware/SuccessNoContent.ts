import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const methods = ['PUT', 'POST']
export default class SuccessNoContent {
	public async handle({ request, response }: HttpContextContract, next) {
		const method = request.method()
		if (!methods.includes(method)) return await next()

		await next()

		// Check if the `hasContent` flag is set in the response's JSON

		if (request.params().hasContent) return // Return the normal response

		return response.status(204).send(null) // Return a 204 No Content response

	}
}
