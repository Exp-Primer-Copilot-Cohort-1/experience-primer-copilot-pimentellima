import { faker } from "@faker-js/faker";
import { test } from "@japa/runner";
import CostCenter from "App/Models/CostCenter";
import { assert } from "chai";
import { loginAndGetToken } from "../helpers/login";

const data = {
    name: faker.person.firstName(),
    active: true,
}

test.group('Cost Center Controller', () => {
    test('display get all cost centers', async ({ client }) => {
        const { token } = await loginAndGetToken(client)
        const response = await client.get('cost-centers').bearerToken(token.token)

        response.assertStatus(200)
    })
    test('display store const center', async ({ client }) => {
        await CostCenter.deleteMany({ unity_id: '652f062efe130421abf65b37' })

        const { token } = await loginAndGetToken(client)
        const response = await client
            .post('cost-centers')
            .json({
                ...data,
                unity_id: '652f062efe130421abf65b37'
            })
            .bearerToken(token.token)

        response.assertStatus(200 | 204)

        const { deletedCount } = await CostCenter.deleteMany({ name: 'Test' })

        assert.equal(deletedCount, 1)
    }).skip()
    test('display show cost center', async ({ client }) => {
        const { token } = await loginAndGetToken(client)
        const response = await client.get('cost-centers/653158213dfa78d54d8772b9').bearerToken(token.token)
        response.assertStatus(200)
    })
    test('display update cost center', async ({ client }) => {
        const { token } = await loginAndGetToken(client)
        const response = await client
            .put('cost-centers/653b3d59e2e79ed8829c1214')
            .json({
                ...data
            })
            .bearerToken(token.token)

        response.assertStatus(200 | 204)
    }).skip()
    test('display delete cost center', async ({ client }) => {
        const { token } = await loginAndGetToken(client)
        const response = await client.delete('cost-centers/653158213dfa78d54d8772b9').bearerToken(token.token)

        response.assertStatus(200 | 204)
    }).skip()
})