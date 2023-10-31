import { test } from '@japa/runner'
import FinancialCategory from 'App/Models/FinancialCategory'
import { FinancialCategoryType, IFinancialCategory } from 'App/Types/IFinancialCategory'
import { assert, expect } from 'chai'
import { loginAndGetToken } from '../helpers/login'

const data: IFinancialCategory = {
    name: 'Teste',
    type: FinancialCategoryType.Expense,
    active: true,
    unity_id: '5f9d5b2b7d5d9c0017b8a4f1',
}
const dataUpdate: IFinancialCategory = {
    name: 'Teste Update',
    type: FinancialCategoryType.Revenue,
    active: true,
    unity_id: '5f9d5b2b7d5d9c0017b8a4f1',
}


test.group('Financial Category Controller', () => {
    test('display index financial category', async ({ client }) => {
        const { token } = await loginAndGetToken(client)

        const response = await client.get('financial-categories').bearerToken(token.token)

        response.assertStatus(200)
    })
    test('display store financial category', async ({ client }) => {
        await FinancialCategory.deleteMany({ name: 'Teste' })

        const { token } = await loginAndGetToken(client)
        const response = await client
            .post('financial-categories')
            .json({
                ...data,
            })
            .bearerToken(token.token)

        response.assertStatus(200 | 204)

        const { deletedCount } = await FinancialCategory.deleteMany({ name: 'Teste' })
    }).skip()
    test('display update financial category', async ({ client }) => {
        await FinancialCategory.deleteMany({ name: 'Teste Update' })

        const financialCategory = await FinancialCategory.create({ ...data })
        const { token } = await loginAndGetToken(client)
        const response = await client
            .put(`financial-categories/${financialCategory._id}`)
            .json({
                ...dataUpdate
            })
            .bearerToken(token.token)

        response.assertStatus(200 | 204)

        const updatedFinancialCategory = await FinancialCategory.findById(financialCategory._id)
        assert.equal(updatedFinancialCategory?.name, dataUpdate.name)


        const { deletedCount } = await FinancialCategory.deleteMany({ name: 'Teste Update' })
        expect(deletedCount).to.be.greaterThan(0)

    })
    test('display show financial category', async ({ client }) => {
        const { token } = await loginAndGetToken(client)
        const response = await client.get('financial-categories/6502ff2eafb54540fe4822d2').bearerToken(token.token)
        response.assertStatus(200)
    })

})
