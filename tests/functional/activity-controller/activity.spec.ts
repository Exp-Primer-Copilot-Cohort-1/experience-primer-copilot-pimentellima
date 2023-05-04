import { test } from '@japa/runner';
import { loginAndGetToken } from '../helpers/login';
import { assert } from 'chai'
import Activity from 'App/Models/Activity';
import { faker } from '@faker-js/faker';

const date = faker.date.future();

const newActivity = {
    date: date,
    hour_start: new Date(date.getHours() + 1),
    hour_end: new Date(date.getHours() + 2),
    status: 'scheduled',
    schedule_block: false,
    procedures: [
        {
            value: '6359965bc109b232759921e3',
            label: 'SESSÃO FISIOTERAPIA ',
            minutes: 60,
            color: '#b452e7',
            val: 160,
            health_insurance: {
                value: '63597974c109b232759921dc',
                label: 'PARTICULAR',
                price: 160
            },
            status: 'PAGO'
        }
    ],
    client: {
        value: '6399e196373d349c09b46dba',
        label: 'TESTE',
        celphone: '(31) 9 9937-9196',
        email: 'wesley de paula pedra',
        partner: null
    },
    obs: null,
    prof: {
        value: '635978cec109b232759921da',
        label: 'RAYSSA CRISTINA LOURES SILVA'
    },
    phone: null,
    all_day: false,
    is_recorrent: false,
    active: true,
    unity_id: '63528c11c109b232759921d1',
    user_id: '635978cec109b232759921da',
    scheduled: 'scheduled',
    prof_id: '635978cec109b232759921da',
    paid: true
}

test.group('Activity Controller', () => {
	test('display all activities', async ({ client }) => {
		const { token } = await loginAndGetToken(client);

		const response = await client
			.get('activity')
			.bearerToken(token.token);

		response.assertStatus(200);
	});

	test('create activity', async ({ client }) => {
		const { token } = await loginAndGetToken(client);

		const response = await client
			.post('activity')
			.json(newActivity)
			.bearerToken(token.token);

		response.assertStatus(200);

		const { deletedCount } = await Activity.deleteOne({ _id: response.body().__id });
        assert.equal(deletedCount, 1);
	});

    test('display invalid date error', async ({ client }) => {
		const { token } = await loginAndGetToken(client);

        
		const response = await client
        .post('activity')
        .json({
                ...newActivity,
                date: faker.date.future(),
                hour_start: faker.date.future(),
                hour_end: faker.date.past()
            })
			.bearerToken(token.token);
            
        console.log(response.error())
        response.assertStatus(409); 
	});

    /* test('update activity', async ({ client }) => {
		const { token } = await loginAndGetToken(client);

		const response = await client
			.put('activity')
			.json(updateActivity)
			.bearerToken(token.token);

		response.assertStatus(200);

	}); */

	test('display all activities by prof_id', async ({ client }) => {
        const prof_id = '6359660fc109b232759921d6';

		const { token } = await loginAndGetToken(client);

		const response = await client
			.get('activity/prof/' + prof_id)
			.bearerToken(token.token);

		response.assertStatus(200);
	});

    test('display all activities by client_id', async ({ client }) => {
        const client_id = '635996b3c109b232759921e5';

		const { token } = await loginAndGetToken(client);

		const response = await client
			.get('activity/client/' + client_id)
			.bearerToken(token.token);

		response.assertStatus(200);
	});

    test('display activity by id', async ({ client }) => {
        const id = "644afd8a2f4968d63d9bfd04";

		const response = await client.get('activity/' + id);
		response.assertStatus(200);
	});

    test('display activity not found', async ({ client }) => {
        const id = '64402e93c07ee00a53234fe0';

		const response = await client
			.get('activity/' + id)

		response.assertStatus(404);
	});
    
});
