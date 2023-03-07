import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { UserNotFoundException } from 'App/Exceptions';
import User from 'App/Models/User';
import { CREATE_USER_RULES } from '../../Rules';

class SignUpController {

  constructor(
    private readonly userModel = User
  ) { }

  public async store({ request }: HttpContextContract) {
    const data = request.validate({
      schema: CREATE_USER_RULES,
      messages: {
        'email.email': 'O campo de email deve ser um email válido',
        'email.unique': 'Este email já está cadastrado',
        'password.required': 'O campo de senha é obrigatório',
        'password.minLength': 'A senha deve ter no mínimo 6 caracteres',
        'document.required': 'O campo de CNPJ/CPF é obrigatório',
        'document.unique': "Este CNPJ/CPF já está cadastrado",
        'document.cpfIsCnpjIsValid': "Este CNPJ/CPF não é válido",
        'name.required': 'O campo de nome é obrigatório',
      }
    });

    const user = await this.userModel.create({ ...data, active: false });

    // await Promise.all([
    //   MailEntity.sendMail({
    //     email: user.email,
    //     props: {
    //       site_activation: `${process.env.SITE_URL}/account-activation/${user.id}`,
    //       label: user.label || user.name,
    //     },
    //     edge: EDGE.confirm_user,
    //     title: 'Ative sua conta na DPSystem',
    //   }),
    //   MailEntity.sendMail({
    //     edge: EDGE.new_account,
    //     props: { user_email: user.email },
    //     title: 'Um novo cadastro',
    //     email: process.env.MAIL_USERNAME,
    //   }),
    // ]);

    return user;
  }

  async activeUser({ params }) {
    const user = await this.userModel.findById(params.id);
    if (!user) {
      throw new UserNotFoundException();
    }
    user.active = true;
    await user.save();
    return user;
  }
}

export default SignUpController
