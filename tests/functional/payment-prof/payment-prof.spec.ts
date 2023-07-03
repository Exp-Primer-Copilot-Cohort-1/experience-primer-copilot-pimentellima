import { test } from '@japa/runner'
import PaymentProf from 'App/Models/PaymentProf'
import { assert } from 'chai'
import { loginAndGetToken } from '../helpers/login'

const paymentProf = {
    value: 0,
    percent: 0,
    procedure: {
        label: 'TESTE',
        value: '6359962cc109b232759921e1',
    },
    health_insurance: {
        label: 'TESTE',
        value: '63597974c109b232759921dc',
    },
    prof: {
        label: 'TESTE',
        value: '63597857c109b232759921d9',
    },
    active: false,
}

test.group('PaymentProf Controller', () => {
    test('Find all payment_profs', async ({ client }) => {
        const { token } = await loginAndGetToken(client)

        const response = await client.get('payments-prof').bearerToken(token.token)
        response.assertStatus(200)
    }).skip()

    test('Create and delete payment_prof', async ({ client }) => {
        const { token } = await loginAndGetToken(client)

        const response = await client
            .post('payments-prof')
            .json(paymentProf)
            .bearerToken(token.token)

        response.assertStatus(200)
        const { deletedCount } = await PaymentProf.deleteOne({
            _id: response.body()._id_,
        })
        assert.equal(deletedCount, 1)
    }).skip()

    test('Find payment_prof by id', async ({ client }) => {
        const { token } = await loginAndGetToken(client)
        const id = '643dce475ddb2027c73fd269'

        const response = await client.get(`payments-prof/${id}`).bearerToken(token.token)
        response.assertStatus(200)
    }).skip()
})
