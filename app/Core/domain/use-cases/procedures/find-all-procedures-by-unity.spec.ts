import { Model } from '__mocks__/model';
import { describe, expect, it, vi } from 'vitest';
import { FindAllProceduresByUnityUseCase } from './find-all-procedures-by-unity';

const makeSut = () => {
	const sut = new FindAllProceduresByUnityUseCase();

	return { sut };
};

describe('Find All Procedures By Unity', () => {
	// beforeAll(async () => {
	// 	if (process.env.DB_CONNECTION_STRING) {
	// 		mongoose.connect(process.env.DB_CONNECTION_STRING);
	// 	}
	// });

	vi.mock('App/Models/Procedure', () => ({
		__esModule: true,
		default: Model,
	}));

	// beforeAll(() => {
	// 	vi.spyOn(Procedure, 'find').mockReturnValue(new Model() as any);
	// });

	it('should return all procedures by unity', async () => {
		const { sut } = makeSut();

		Model.find = () =>
		({
			exec: () => Promise.resolve([]),
		} as any);

		const proceduresOrErr = await sut.execute({
			unity_id: 'any_unity_id',
		});

		expect(proceduresOrErr.isRight()).toBeTruthy();
	});
});
