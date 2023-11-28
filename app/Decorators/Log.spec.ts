import { COLLECTIONS_KEYS } from 'App/Models'
import { Model } from '__mocks__'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import LogDecorator, { ACTION } from './Log'

describe.skip('LogDecorator (Only)', () => {

	beforeAll(() => {
		// Substitua as funções reais pelas fictícias
		vi.mock('App/Models/Log', () => ({
			default: () => Model,
		}))
	})

	it('should log the action', async () => {
		// Crie um objeto fictício para o contexto HTTP
		const mockHttpContext = {
			auth: {
				user: {
					_id: 'user1',
					unity_id: 'unity1',
				},
			},
			request: {
				params: () => ({ id: 'id1' }),
			},
			response: {
				getBody: () => ({ name: 'John', age: 21 }),
				getStatus: () => 200,
			},
		}

		// Crie funções fictícias para as funções chamadas dentro do decorador
		const mockGetOriginalDoc = vi.fn().mockResolvedValue({ name: 'John', age: 20 })
		const mockGenerateCollectionLog = vi.fn().mockResolvedValue(Model)
		const mockGetCollectionId = vi.fn().mockReturnValue('id1');
		const mockActionCompare = vi.fn().mockReturnValue([{ age: 20 }, { age: 21 }])

			// Substitua as funções reais pelas fictícias
			(LogDecorator as any).getOriginalDoc = mockGetOriginalDoc;
		(LogDecorator as any).generateCollectionLog = mockGenerateCollectionLog;
		(LogDecorator as any).getCollectionId = mockGetCollectionId;
		(LogDecorator as any).actionCompare = mockActionCompare


		// Crie um método fictício para testar o decorador
		const mockMethod = vi.fn().mockResolvedValue(true)
		const descriptor = { value: mockMethod }
		const decorated = LogDecorator(COLLECTIONS_KEYS.Account, ACTION.POST)(
			null,
			'method',
			descriptor,
		)

		// Chame o método decorado
		const result = await decorated.value(mockHttpContext)

		// Verifique se o método original foi chamado
		expect(mockMethod).toHaveBeenCalled()

		// Verifique se as funções de log foram chamadas com os argumentos corretos
		expect(mockGetOriginalDoc).toHaveBeenCalledWith(ACTION.POST, 'id1', COLLECTIONS_KEYS.Account)
		expect(mockGenerateCollectionLog).toHaveBeenCalledWith('unity1')
		expect(mockActionCompare).toHaveBeenCalledWith(ACTION.POST, { name: 'John', age: 20 }, { name: 'John', age: 21 })
		expect(mockGetCollectionId).toHaveBeenCalledWith({ name: 'John', age: 21 }, 'id1')

		// Verifique se o log foi criado
		expect(mockGenerateCollectionLog().create).toHaveBeenCalledWith({
			action: ACTION.POST,
			collection_name: COLLECTIONS_KEYS.Account,
			date: expect.any(String),
			modified: { age: 21 },
			original: { age: 20 },
			user: 'user1',
			collection_id: 'id1',
			unity_id: 'unity1',
		})

		// Verifique se o resultado é o esperado
		expect(result).toBe(true)

	})
})