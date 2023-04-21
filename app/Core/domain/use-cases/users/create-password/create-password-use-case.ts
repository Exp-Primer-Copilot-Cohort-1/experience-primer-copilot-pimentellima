import { UseCase } from 'App/Core/interfaces/use-case.interface';
import { PromiseEither, right } from 'App/Core/shared';

type Password = string;

export class CreatePasswordUseCase
	implements UseCase<Password, undefined, Password>
{
	constructor() { }

	public async execute(password?: Password): PromiseEither<Error, string> {
		if (password) {
			return right(password);
		}

		const pwdChars =
			'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		const pwdLen = 6;
		const randPassword = Array(pwdLen)
			.fill(pwdChars)
			.map((x) => x[Math.floor(Math.random() * x.length)])
			.join('');

		// try {
		// 	// await Mail.send(
		// 	// 	'emails.create',
		// 	// 	{ password: data.password },
		// 	// 	(message) => {
		// 	// 		message.from('ti@dpsystem.com.br');
		// 	// 		message.to(data.email);
		// 	// 		message.subject('A sua senha');
		// 	// 	},
		// 	// );
		// 	Log.info(`Senha enviada para o ${data.email}`);
		// } catch (error) {
		// 	Log.error(error.message);
		// }

		return right(randPassword);
	}
}
