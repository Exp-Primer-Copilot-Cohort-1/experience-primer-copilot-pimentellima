import { } from '@ioc:Adonis/Core/Application';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Unity from 'App/Models/Unity';
import { CREATE_UNITY_RULES } from '../../Rules';

class SignUpUnityController {

  constructor(
    private readonly unityModel = Unity,
  ) { }

  public async store({ request }: HttpContextContract) {
    await request.validate({
      schema: CREATE_UNITY_RULES,
      messages: {
        'email.required': 'O campo de email é obrigatório',
        'email.email': 'O campo de email deve ser um email válido',
        'email.unique': 'Este email já está cadastrado',
        'document.required': 'O campo de CNPJ/CPF é obrigatório',
        'document.unique': "Este CNPJ/CPF já está cadastrado",
        'document.cpfIsCnpjIsValid': "Este CNPJ/CPF não é válido",
        'name.required': 'O campo de nome é obrigatório',
      }
    });

    const data = request.all()

    const unity = await this.unityModel.create({ ...data, active: true });

    // const permissions = new PermissionEntity()
    //   .defineAllPermissionByTrue()
    //   .params();

    return unity;
  }

}

export default SignUpUnityController
