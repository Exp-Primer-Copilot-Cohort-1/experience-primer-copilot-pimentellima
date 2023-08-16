import { faker } from '@faker-js/faker'
import { AppointmentStatus, PaymentStatus } from 'App/Helpers'

export const makeValidActivity = () => {
	const date = new Date('2024-11-14T03:00:24.111Z')
	date.setHours(0)
	const hour_start = date
	hour_start.setHours(3)
	const hour_end = date
	hour_end.setHours(hour_start.getHours() + 1)
	const validActivity = {
		_id: faker.string.numeric(),
		date,
		hour_start,
		hour_end,
		scheduled: AppointmentStatus.SCHEDULED,
		status: PaymentStatus.PENDING,
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
					price: 160,
				},
				status: 'PAGO',
			},
		],
		client: {
			value: '6399e196373d349c09b46dba',
			label: 'TESTE',
			celphone: '(31) 9 9937-9196',
			email: 'joaotesla@gmail.com',
			partner: null,
		},
		obs: 'testes',
		prof: {
			value: '635978cec109b232759921da',
			label: 'TESTE',
		},
		phone: null,
		all_day: false,
		is_recorrent: false,
		active: true,
		user_id: '635978cec109b232759921da',
		unity_id: '635978cec109b232759921da',
		prof_id: '635978cec109b232759921da',
	}
	return validActivity
}
