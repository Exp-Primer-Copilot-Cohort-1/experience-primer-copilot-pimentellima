import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeActivationUserComposer, makeCreateAdminComposer } from 'App/Core/composers'
import { CREATE_USER_RULES } from '../../Rules'
class SignUpAdminController {
	constructor() { } // eslint-disable-line

	async store(ctx: HttpContextContract) {
		ctx.request.validate({
			schema: CREATE_USER_RULES,
			messages: {
				'email.email': 'O campo de email deve ser um email válido',
				'email.unique': 'Este email já está cadastrado',
				'password.required': 'O campo de senha é obrigatório',
				'password.minLength': 'A senha deve ter no mínimo 6 caracteres',
				'document.required': 'O campo de CNPJ/CPF é obrigatório',
				'document.unique': 'Este CNPJ/CPF já está cadastrado',
				'document.cpfOrCnpjIsValid': 'Este CNPJ/CPF não é válido',
				'name.required': 'O campo de nome é obrigatório',
				'celphone.required': 'O campo de telefone é obrigatório',
			},
		})

		return adaptRoute(makeCreateAdminComposer(), ctx)
	}

	async activeUser(ctx: HttpContextContract) {
		return adaptRoute(makeActivationUserComposer(), ctx)
	}
}

export default SignUpAdminController
