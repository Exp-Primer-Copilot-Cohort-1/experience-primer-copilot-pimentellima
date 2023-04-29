import { test } from '@japa/runner';
import { loginAndGetToken } from '../helpers/login';
import { assert } from 'chai'
import Activity from 'App/Models/Activity';

const newActivity = {
    date: '2023-04-26T03:00:00.000Z',
    hour_start: '2023-04-26T11:00:00.000Z',
    hour_end: '2023-04-26T12:00:00.000Z',
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
        label: 'Wesley de Paula Pedra',
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
    created_at: '2023-04-26T14:40:15.161Z',
    updated_at: '2023-04-26T17:51:20.526Z',
    paid: true
}

const updateActivity = {
    _id: '64496e0318255202a4fd3964',
    date: '2023-04-26T03:00:00.000Z',
    hour_start: '2023-04-26T11:00:00.000Z',
    hour_end: '2023-04-26T11:50:00.000Z',
    status: 'scheduled',
    schedule_block: false,
    procedures: [
        {
            value: '6359962cc109b232759921e1',
            label: 'SESSÃO DR. MOISES RODRIGUES',
            minutes: 50,
            color: '#4291cd',
            val: 260,
            health_insurance: {
                value: '63597974c109b232759921dc',
                label: 'PARTICULAR',
                price: 260
            },
            status: 'PAGO'
        }
    ],
    client: {
        value: '6399d980373d349c09b46db1',
        label: 'Vanderlei de Oliveira de Freitas',
        celphone: '(31) 9 7172-1530',
        email: 'vanderlei de oliveira de freitas',
        partner: null
    },
    obs: null,
    prof: {
        value: '63597857c109b232759921d9',
        label: 'MOISÉS RODRIGUES DE PAULA'
    },
    phone: null,
    all_day: false,
    is_recorrent: false,
    active: true,
    unity_id: '63528c11c109b232759921d1',
    user_id: '63597857c109b232759921d9',
    scheduled: 'scheduled',
    prof_id: '63597857c109b232759921d9',
    created_at: '2023-04-26T18:31:31.652Z',
    updated_at: '2023-04-27T14:14:40.738Z',
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
			.json({ 
                ...newActivity,
                date: new Date().toISOString()
            })
			.bearerToken(token.token);

        console.log(response.error())
		response.assertStatus(200);

		await Activity.findOneAndDelete({},{"sort": { "_id": -1 }})
	});

    test('display conflicting dates error', async ({ client }) => {
		const { token } = await loginAndGetToken(client);

		const response = await client
			.post('activity')
			.json({...newActivity})
			.bearerToken(token.token);

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
        const id = "644d1720875309bd842f8e32";

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
