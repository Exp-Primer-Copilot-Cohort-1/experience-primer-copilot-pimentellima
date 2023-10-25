import { faker } from "@faker-js/faker";
import { ActivityNotGroupIdProvider } from "App/Core/domain/errors/activity-not-group-id-provider";
import { CurrentNotSmallerError } from "App/Core/domain/errors/current-not-smaller-error";
import { FormNotTypeProvider } from "App/Core/domain/errors/form-not-type-provider";
import { QuestionNotFound } from "App/Core/domain/errors/question-not-found";
import { RFormSFManagerContract } from "App/Core/domain/repositories/interface/reply-form-standard-franchise-manager.interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { left, right } from "App/Core/shared";
import { TypeForms } from "App/Types/IBusinessFranchises";
import { subWeeks } from 'date-fns';
import { describe, expect, it, vi } from "vitest";
import { VerifyCurrentReplyInLessThanPreviousUseCase } from './verify-current-reply-is-less-than-previous-use-case';

const makeQuestion = (id: number, sentence: string, min = 1, max = 5) => {
	return {
		value: id,
		question: sentence,
		answer: faker.number.int({ min, max }),
	}
}

type OptionsQuestion = {
	min?: number,
	max?: number,
	created_at?: Date,
}

const makeReply = (
	group_id: string, ids: number[], {
		min = 1,
		max = 5,
		created_at = faker.date.past(),
	} = {} as OptionsQuestion) => {
	return {
		questions: ids.map((id) => makeQuestion(
			id,
			faker.lorem.sentence(),
			min,
			max
		)) as any[],
		group_id,
		created_at,
	}
}

const manager: RFormSFManagerContract = {
	create: vi.fn(),
	findInfoThisReply: vi.fn(),
	findAllByGroupId: vi.fn(async (group_id) => {
		const _ids = [1, 2, 3, 4, 5];
		const dateNow = new Date();
		const datePast = subWeeks(dateNow, 1);

		return right([
			makeReply(group_id, _ids, { created_at: dateNow, min: 1, max: 2 }),
			makeReply(group_id, _ids, { created_at: datePast, min: 3, max: 5 }),
		]) as any
	})
}

const params = { group_id: 'any_group_id', type: TypeForms.START };

const makeSut = () => {
	const spyFindAll = vi.spyOn(manager, 'findAllByGroupId')
	const sut = new VerifyCurrentReplyInLessThanPreviousUseCase(manager);
	return { sut, spyFindAll }
}

describe("Verify current reply in less than previous (Unit)", async () => {
	it("should verify current reply in less than previous", async () => {
		const { sut } = makeSut();
		const msgOrError = await sut.execute(params);
		expect(msgOrError.isRight()).toBeTruthy();
	});

	it("should return error if current reply is greater than previous", async () => {
		const { sut, spyFindAll } = makeSut();
		const dateNow = new Date();
		const datePast = subWeeks(dateNow, 1);

		spyFindAll.mockImplementationOnce(async (_) => {
			return right([
				makeReply(params.group_id, [1, 2, 3, 4, 5], { min: 2, max: 5, created_at: dateNow }),
				makeReply(params.group_id, [1, 2, 3, 4, 5], { min: 1, max: 1, created_at: datePast }),
			]) as any
		})

		const msgOrError = await sut.execute(params);
		console.log(msgOrError)
		expect(msgOrError.isLeft()).toBeTruthy();
	});

	it("should return error if current reply is equal to previous", async () => {
		const { sut, spyFindAll } = makeSut();
		const dateNow = new Date();
		const datePast = subWeeks(dateNow, 1);

		spyFindAll.mockImplementationOnce(async (_) => {
			return right([
				makeReply(params.group_id, [1, 2, 3, 4, 5], { min: 1, max: 1, created_at: dateNow }),
				makeReply(params.group_id, [1, 2, 3, 4, 5], { min: 1, max: 1, created_at: datePast }),
			]) as any
		})

		const msgOrError = await sut.execute(params);
		expect(msgOrError.isLeft()).toBeTruthy();
		expect(msgOrError.extract()).toBeInstanceOf(CurrentNotSmallerError);
	});

	it("should call manager.findAllByGroupId with correct params", async () => {
		const { sut, spyFindAll } = makeSut();
		await sut.execute(params);
		expect(spyFindAll).toHaveBeenCalledWith(params.group_id, params.type);
	})

	it("should return error if manager.findAllByGroupId returns error", async () => {
		const { sut, spyFindAll } = makeSut();
		spyFindAll.mockImplementationOnce(async (_) => {
			return left(new AbstractError('any_error', 400))
		})
		const msgOrError = await sut.execute(params);
		expect(msgOrError.isLeft()).toBeTruthy();
	})

	it("should return error CurrentNotSmallerError if sut returns error", async () => {
		const { sut, spyFindAll } = makeSut();
		const dateNow = new Date();
		const datePast = subWeeks(dateNow, 1);

		spyFindAll.mockImplementationOnce(async (_) => {
			return right([
				makeReply(params.group_id, [1, 2, 3, 4, 5], { min: 1, max: 1, created_at: dateNow }),
				makeReply(params.group_id, [1, 2, 3, 4, 5], { min: 1, max: 1, created_at: datePast }),
			]) as any
		})

		const msgOrError = await sut.execute(params);
		expect(msgOrError.extract()).toBeInstanceOf(CurrentNotSmallerError);
	})

	it("should return error if group_id is invalid", async () => {
		const { sut } = makeSut();
		const msgOrError = await sut.execute({ group_id: null as any, type: TypeForms.START });
		expect(msgOrError.isLeft()).toBeTruthy();
		expect(msgOrError.extract()).toBeInstanceOf(ActivityNotGroupIdProvider);
	})

	it("should return error if type is invalid", async () => {
		const { sut } = makeSut();
		const msgOrError = await sut.execute({ ...params, type: null as any });
		expect(msgOrError.isLeft()).toBeTruthy();
		expect(msgOrError.extract()).toBeInstanceOf(FormNotTypeProvider);
	})

	it("should return right if manager.findAllByGroupId returns array length === 1", async () => {
		const { sut, spyFindAll } = makeSut();
		spyFindAll.mockImplementationOnce(async (_) => {
			return right([{} as any])
		})
		const msgOrError = await sut.execute(params);
		expect(msgOrError.isRight()).toBeTruthy();
		expect(msgOrError.extract()).toEqual({ message: "Don't have previous reply" });
	})

	it("should return right if manager.findAllByGroupId returns array length === 0", async () => {
		const { sut, spyFindAll } = makeSut();
		spyFindAll.mockImplementationOnce(async (_) => {
			return right([])
		})
		const msgOrError = await sut.execute(params);
		expect(msgOrError.isRight()).toBeTruthy();
		expect(msgOrError.extract()).toEqual({ message: "Don't have previous reply" });
	})

	it("should throw error QuestionNotFound if questions prev and current are different", async () => {
		const { sut, spyFindAll } = makeSut();
		const dateNow = new Date();
		const datePast = subWeeks(dateNow, 1);

		spyFindAll.mockImplementationOnce(async (_) => {
			return right([
				makeReply(params.group_id, [1, 2, 3, 4, 5], { min: 1, max: 1, created_at: dateNow }),
				makeReply(params.group_id, [4, 5, 6, 7, 8], { min: 1, max: 1, created_at: datePast }),
			]) as any
		})

		expect(() => sut.execute(params)).rejects.toThrowError(new QuestionNotFound())
	})
});