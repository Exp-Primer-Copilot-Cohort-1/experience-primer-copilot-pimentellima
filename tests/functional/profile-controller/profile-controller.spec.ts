import { test } from "@japa/runner"
import { loginAndGetToken } from "../helpers/login"


test.group('Profile Controller', () => {
    test('display index profile', async ({ client }) => {
        const { token } = await loginAndGetToken(client)

        const response = await client.get('profile').bearerToken(token.token)

        response.assertStatus(200)
    })


})