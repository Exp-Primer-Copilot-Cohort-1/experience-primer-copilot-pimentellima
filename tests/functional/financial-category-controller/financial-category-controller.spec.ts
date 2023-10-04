import { test } from '@japa/runner'
import { loginAndGetToken } from '../helpers/login'



test.group('Financial Category Controller', () => {
    test('display index category ', async ({ client }) => {
        const { token } = await loginAndGetToken(client)

        const response = await client.get('financial-categories').bearerToken(token.token)

        response.assertStatus(200)
    })

})
