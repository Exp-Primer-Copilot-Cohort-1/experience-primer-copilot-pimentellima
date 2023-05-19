
{/*import { test } from '@japa/runner';
import Unity from 'App/Models/Unity';
import { assert } from 'chai';


test.group('Unity Controller', () => {
    test('display store unity', async ({ client }) => {
        const unityData = {
            is_company: false,
            date_expiration: '2021-01-01',
            password: '123456',
            repeat_password: '123456',
            email: 'nediauling@hotmail.com',
            name: 'Test Unity',
            document: '123456789',
            type: 'admin',
        };

        const response = await client.put('unity/:id').json({
            ...unityData,
        });
        response.assertStatus(200);

        const { _id } = response.body() as any;


        const { deletedCount } = await Unity.deleteOne({ _id });
        assert.equal(deletedCount, 1);
    });
});*/}