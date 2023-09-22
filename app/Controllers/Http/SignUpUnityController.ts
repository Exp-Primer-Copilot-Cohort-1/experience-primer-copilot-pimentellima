import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UnityAlreadyExistException } from 'App/Exceptions'
import Unity from 'App/Models/Unity'
import { CREATE_UNITY_RULES } from '../../Rules'

class SignUpUnityController {
	constructor(private readonly unityModel = Unity) { } // eslint-disable-line

	public async store({ request }: HttpContextContract) {
		await request.validate({
			schema: CREATE_UNITY_RULES,
			messages: {
				'email.required': 'O campo de email é obrigatório',
				'email.email': 'O campo de email deve ser um email válido',
				'email.unique': 'Este email já está cadastrado',
				'document.required': 'O campo de CNPJ/CPF é obrigatório',
				'document.unique': 'Este CNPJ/CPF já está cadastrado',
				'document.cpfOrCnpjIsValid': 'Este CNPJ/CPF não é válido',
				'name.required': 'O campo de nome é obrigatório',
			},
		})

		const data = request.all()

		const unityExists = await this.unityModel.findOne({ name: data.name })

		if (unityExists) {
			throw new UnityAlreadyExistException()
		}

		const unity = await this.unityModel.create({ ...data, active: true })

		return unity
	}
}

export default SignUpUnityController
