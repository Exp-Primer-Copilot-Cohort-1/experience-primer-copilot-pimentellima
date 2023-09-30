import { base64 } from '@ioc:Adonis/Core/Helpers'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeCreateAdminComposer } from 'App/Core/composers'
import { UserNotFoundException } from 'App/Exceptions'
import User from 'App/Models/User'
import { CREATE_USER_RULES } from '../../Rules'
class SignUpAdminController {
	constructor(private readonly userModel = User) { } // eslint-disable-line

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

	async activeUser({ params }) {
		const id = base64.decode(params.id)

		const user = await this.userModel.findById(id)
		if (!user) {
			throw new UserNotFoundException()
		}
		user.active = true
		await user.save()
		return user
	}
}

export default SignUpAdminController
