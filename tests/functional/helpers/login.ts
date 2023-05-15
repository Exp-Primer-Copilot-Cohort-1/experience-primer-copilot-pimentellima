type CredentialsSuccess = {
	token: {
		type: string
		token: string
	}
	user: {
		[key: string]: any
		_id: string
	}
}
import { ApiClient } from '@japa/api-client'

export async function loginAndGetToken(client: ApiClient): Promise<CredentialsSuccess> {
	const login = await client.post('/sessions').json({
		email: 'rmmorais2@gmail.com',
		password: '123456',
	})

	if (login.error()) {
		console.log()
	}

	return login.body() as CredentialsSuccess
}
