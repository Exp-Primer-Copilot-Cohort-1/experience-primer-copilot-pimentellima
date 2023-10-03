import { describe, expect, it, vi } from 'vitest'
import { adaptRoute } from './adapter-route'
import { ControllerGeneric } from './controller/helpers'

describe('Adapter Route (Unit)', () => {
	it('should return a function that handles HTTP requests', async () => {
		const controller: ControllerGeneric = {
			handle: vi.fn().mockResolvedValue({
				body: { message: 'Hello, world!' },
				statusCode: 200,
			}),
		}

		const context = {
			request: {
				body: vi.fn().mockReturnValue({}),
				qs: vi.fn().mockReturnValue({}),
				method: vi.fn().mockReturnValue('GET'),
				url: vi.fn().mockReturnValue('/test'),
			},
			params: {},
			response: {
				status: vi.fn().mockReturnThis(),
				json: vi.fn().mockReturnThis(),
			},
			auth: {
				user: {},
			},
		}

		const customParams = { foo: 'bar' }

		await adaptRoute(controller, context as any, customParams)

		expect(controller.handle).toHaveBeenCalledWith(
			expect.objectContaining({
				body: expect.objectContaining(customParams),
			}),
			context.auth.user,
		)

		expect(context.response.status).toHaveBeenCalledWith(200)
		expect(context.response.json).toHaveBeenCalledWith({ message: 'Hello, world!' })
	})
})
