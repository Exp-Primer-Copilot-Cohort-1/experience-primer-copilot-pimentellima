import { describe, expect, it, vi } from 'vitest'
import { HealthInsuranceInMemoryManager } from '../../repositories'
import { CreateHealthInsuranceUseCase } from './create-use-case'

const item = {
	name: 'any_name',
	register_code: 'any_register_code',
	carence: 0,
	profs: [],
	active: true,
	unity_id: 'any_unity_id',
	_id: '',
	created_at: '',
	updated_at: '',
}

const makeSut = () => {
	const manager = new HealthInsuranceInMemoryManager()
	const sut = new CreateHealthInsuranceUseCase(manager)
	return { sut, manager }
}

describe('Create use case (Unit)', () => {
	it('should return is left not passed params', async () => {
		const { sut } = makeSut()
		const result = await sut.execute(null as any)
		expect(result.isLeft()).toBeTruthy()
	})

	it('should verify if name is already registered', async () => {
		const { sut, manager } = makeSut()
		const spyOnWhere = vi.spyOn(manager, 'create')
		const result = await sut.execute(item)

		expect(result.isRight()).toBeTruthy()
		expect(spyOnWhere).toHaveBeenCalled()
	})
})
