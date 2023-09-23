import { describe, expect, it, vi } from 'vitest'
import { ControllerGeneric } from './controller/helpers'
import { adaptRoute } from './mongoose-adapter'

describe('Mongoose Adapter (Unit)', () => {
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

		const result = await adaptRoute(controller, context, customParams)

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
