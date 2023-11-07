import { right } from 'App/Core/shared'
import {
	ClientManagerInMemory,
	ProceduresManagerInMemory,
	ProfManagerInMemory,
	UnitiesManagerInMemory,
} from '__mocks__'
import { describe, expect, it, vi } from 'vitest'
import { SendNewAppointment } from './send-new-appointment-use-case'
import { ISendNotificationNewAppointmentUseCase } from './use-cases.interface'

const SendNotificationNewAppointmentMock: ISendNotificationNewAppointmentUseCase = {
	execute: async () => (right({
		message: 'ok',
	}))
}

const makeSut = () => {

	const params = {
		client: process.env.TEST_INTEGRATION_CLIENT_ID,
		date: new Date().toISOString(),
		hour_start: '08:00',
		prof: process.env.TEST_INTEGRATION_USER_ID,
		procedures: [
			{
				_id: process.env.TEST_INTEGRATION_PROCEDURE_ID,
				health_insurance: process.env.TEST_INTEGRATION_HEALTH_INSURANCE_ID,
				price: 100,
			}
		],
		unity_id: process.env.TEST_INTEGRATION_UNITY_ID,
	}

	const sut = new SendNewAppointment(
		ClientManagerInMemory,
		ProceduresManagerInMemory,
		ProfManagerInMemory,
		UnitiesManagerInMemory,
		SendNotificationNewAppointmentMock,
	)

	return {
		sut,
		params,
		spy: {
			client: vi.spyOn(ClientManagerInMemory, 'findById'),
			procedure: vi.spyOn(ProceduresManagerInMemory, 'findBasic'),
			prof: vi.spyOn(ProfManagerInMemory, 'findById'),
			unity: vi.spyOn(UnitiesManagerInMemory, 'findById'),
		}
	}
}


describe("Send Email for new appointments (Unit)", () => {
	it("should be defined", async () => {
		const { sut, params } = makeSut()

		const response = await sut.execute(params as any)

		expect(response.isRight()).toBeTruthy()
	})
})