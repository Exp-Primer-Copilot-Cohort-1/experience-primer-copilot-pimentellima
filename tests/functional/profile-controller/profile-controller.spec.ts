import { faker } from "@faker-js/faker"
import { test } from "@japa/runner"
import { loginAndGetToken } from "../helpers/login"

const data = {
    _id: '65398c8ac464458e5a81f5e2',
    name: faker.person.firstName(),
    active: true,
    avatar: 'teste',
    email: 'test@hotmail.com',
    phone: '123456789',
    celphone: '123456789',
    unity_id: '6359962cc109b232759921e1',
    record: '123456789',
    profession: 'teste',
    occupation_code: '123456789',
    show_lack: true,

}
test.group('Profile Controller', () => {
    test('display index profile', async ({ client }) => {
        const { token } = await loginAndGetToken(client)

        const response = await client.get('profile').bearerToken(token.token)
        console.log(response.body())

        response.assertStatus(200)
    })
    test('update profile', async ({ client }) => {
        const { token } = await loginAndGetToken(client)

        const response = await client.put('profile').bearerToken(token.token).json(data)
        console.log(response.body())
        response.assertStatus(200 | 204)

    })


})