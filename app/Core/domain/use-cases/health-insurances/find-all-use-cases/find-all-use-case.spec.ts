import { HealthInsuranceInMemoryManager } from 'App/Core/domain/repositories/health-insurance/health-insurance-in-memory-repository';
import { right } from 'App/Core/shared';
import { describe, expect, it, vi } from 'vitest';
import { FindAllHealthInsuranceByNameUseCase } from './find-all-by-name-use-case';
import { FindAllHealthInsuranceByUnityUseCase } from './find-all-by-unity-id-use-case';
import { FindAllHealthInsuranceUseCase } from './find-all-use-case';

const makeSut = () => {
	const healthInsuranceManager = new HealthInsuranceInMemoryManager();

	const findAllByNameUseCase = new FindAllHealthInsuranceByNameUseCase(
		healthInsuranceManager,
	);

	const findAllByUnityUseCase = new FindAllHealthInsuranceByUnityUseCase(
		healthInsuranceManager,
	);

	const sut = new FindAllHealthInsuranceUseCase(
		findAllByNameUseCase,
		findAllByUnityUseCase,
	);

	return {
		sut,
		healthInsuranceManager,
		findAllByNameUseCase,
		findAllByUnityUseCase,
	};
};

describe('Find All Health Insurances Use Case (Unit)', () => {
	it('should call HealthInsurance.find when name is provided', async () => {
		const { sut, healthInsuranceManager } = makeSut();

		const spyOnWhere = vi.spyOn(healthInsuranceManager, 'findAllByName');

		const optsQuery = {
			name: 'test',
			unity_id: '1',
		};

		await sut.execute(optsQuery);

		expect(spyOnWhere).toHaveBeenCalledWith('test', '1');
	});

	it('should call healthInsuranceManager.findAllByUnityId when name is not provided', async () => {
		const { sut, healthInsuranceManager } = makeSut();

		const spyOnFindAllByUnityId = vi.spyOn(
			healthInsuranceManager,
			'findAllByUnityId',
		);

		const optsQuery = {
			unity_id: '1',
		};

		const expectedResult = right([]);
		(healthInsuranceManager.findAllByUnityId as any).mockResolvedValue(
			expectedResult,
		);

		const result = await sut.execute(optsQuery);

		expect(spyOnFindAllByUnityId).toHaveBeenCalledWith('1');
		expect(result).toEqual(expectedResult);
	});
});

describe('Find All Health Insurances By Name Use Case (Unit)', () => {
	it('should call HealthInsurance.find', async () => {
		const { findAllByNameUseCase, healthInsuranceManager } = makeSut();

		const spyOnWhere = vi.spyOn(healthInsuranceManager, 'findAllByName');

		const optsQuery = {
			name: 'test',
			unity_id: '1',
		};

		await findAllByNameUseCase.execute(optsQuery);

		expect(spyOnWhere).toHaveBeenCalledWith('test', '1');
	});

	it('should call HealthInsurance.find with name as null', async () => {
		const { findAllByNameUseCase } = makeSut();

		const optsQuery = {
			unity_id: '1',
			name: null,
		} as any;

		const responseOrErr = await findAllByNameUseCase.execute(optsQuery);

		expect(responseOrErr.isLeft()).toBeTruthy();
	});
});

describe('Find All Health Insurances By Unity Id Use Case (Unit)', () => {
	it('should call HealthInsurance.find', async () => {
		const { findAllByUnityUseCase, healthInsuranceManager } = makeSut();

		const spyOnWhere = vi.spyOn(healthInsuranceManager, 'findAllByUnityId');

		const optsQuery = {
			unity_id: '1',
		};

		await findAllByUnityUseCase.execute(optsQuery);

		expect(spyOnWhere).toHaveBeenCalledWith('1');
	});

	it('should call HealthInsurance.find with unity_id as null', async () => {
		const { findAllByUnityUseCase } = makeSut();

		const optsQuery = {
			unity_id: null,
		} as any;

		const responseOrErr = await findAllByUnityUseCase.execute(optsQuery);

		expect(responseOrErr.isLeft()).toBeTruthy();
	});
});
