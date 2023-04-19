type CredentialsSuceess = {
	token: {
		type: string;
		token: string;
	};
	user: {
		[key: string]: any;
		_id: string;
	};
};
import { ApiClient } from '@japa/api-client';

export async function loginAndGetToken(
	client: ApiClient,
): Promise<CredentialsSuceess> {
	const login = await client.post('/sessions').json({
		email: 'rmmorais2@gmail.com',
		password: '123456',
	});

	return login.body() as CredentialsSuceess;
}
