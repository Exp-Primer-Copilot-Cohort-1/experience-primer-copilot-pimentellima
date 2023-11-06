import { faker } from "@faker-js/faker"
import { test } from "@japa/runner"
import Prescription from "App/Models/Prescription"
import { assert } from "chai"
import { loginAndGetToken } from "../helpers/login"

// const ObjectId = mongoose.Types.ObjectId

// const value_id = new ObjectId('6359962cc109b232759921e1')
const data = {
    name: 'Teste',
    prof: {
        label: 'Teste',
        value: '6359962cc109b232759921e1'
    },
    text: 'prescription',
}
const updateData = {
    name: faker.person.firstName(),
    prof: {
        label: 'Teste',
        value: '6359962cc109b232759921e1'
    },
    text: 'prescription update',
}


test.group('Prescription Controller', () => {
    test('display index prescription', async ({ client }) => {
        const { token } = await loginAndGetToken(client)

        const response = await client.get('prescriptions').bearerToken(token.token)
        // console.log(response.body())

        response.assertStatus(200)
    })
    test('store prescription', async ({ client }) => {
        await Prescription.deleteMany({ name: 'Teste' })
        const { token } = await loginAndGetToken(client)

        const response = await client
            .post('prescriptions')
            .bearerToken(token.token)
            .json(data)
        // console.log(response.body())
        response.assertStatus(200 | 204)
        const { deletedCount } = await Prescription.deleteOne({ name: 'Teste' })
        assert.equal(deletedCount, 1)

    })
    test('update prescription', async ({ client }) => {
        const { token } = await loginAndGetToken(client)

        const response = await client
            .put(`prescriptions/65494dee7a8bfbfc5cf34b6e`)
            .bearerToken(token.token)
            .json(updateData)
        // console.log(response.body())

        response.assertStatus(200 | 204)
        const updatePrescription = await Prescription.findById('65494dee7a8bfbfc5cf34b6e')
        assert.equal(updatePrescription.name, updateData.name)
        // const { deletedCount } = await Prescription.deleteOne({ name: 'testeUpdate' })
        // assert.equal(deletedCount, 1)

    })
    test('display show prescription', async ({ client }) => {
        const { token } = await loginAndGetToken(client)
        const response = await client.get('prescriptions/6541fc62d045ddeb92a90ce7').bearerToken(token.token)
        // console.log(response.body())

        response.assertStatus(200)
    })
    test('update status prescription', async ({ client }) => {
        const { token } = await loginAndGetToken(client)
        const updateStatusData: any = await Prescription.findById('6541fc62d045ddeb92a90ce7')

        const status = !updateStatusData.active
        const statusData = {
            status: status
        }

        const response = await client
            .put(`prescriptions/status/6541fc62d045ddeb92a90ce7`)
            .bearerToken(token.token)
            .json(statusData)
        // console.log(response.body())

        response.assertStatus(200 | 204)
        // const { deletedCount } = await Prescription.deleteOne({ name: 'Teste' })
        // assert.equal(deletedCount, 1)
    })

})