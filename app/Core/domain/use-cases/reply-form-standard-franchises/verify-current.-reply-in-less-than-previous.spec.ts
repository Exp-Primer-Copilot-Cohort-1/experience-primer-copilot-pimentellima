import { faker } from "@faker-js/faker";
import { AbstractError } from "App/Core/errors/error.interface";
import { left, right } from "App/Core/shared";
import { subWeeks } from 'date-fns';
import { describe, expect, it, vi } from "vitest";
import { ActivityNotGroupIdProvider } from "../../errors/activity-not-group-id-provider";
import { CurrentNotSmallerError } from "../../errors/current-not-smaller-error";
import { RFormSFManagerInterface } from "../../repositories/interface/reply-form-standard-franchise-manager.interface";
import { VerifyCurrentReplyInLessThanPreviousUseCase } from './verify-current-reply-is-less-than-previous-use-case';
const makeQuestion = (id: number, sentence: string, min = 1, max = 5) => {
	return {
		_id: id,
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

const manager: RFormSFManagerInterface = {
	create: vi.fn(),
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

const group_id = 'any_group_id';

const makeSut = () => {
	const spyFindAll = vi.spyOn(manager, 'findAllByGroupId')
	const sut = new VerifyCurrentReplyInLessThanPreviousUseCase(manager);
	return { sut, spyFindAll }
}

describe("Verify current reply in less than previous (Unit)", async () => {
	it("should verify current reply in less than previous", async () => {
		const { sut } = makeSut();
		const msgOrError = await sut.execute({ group_id });
		expect(msgOrError.isRight()).toBeTruthy();
	});

	it("should return error if current reply is greater than previous", async () => {
		const { sut, spyFindAll } = makeSut();
		const dateNow = new Date();
		const datePast = subWeeks(dateNow, 1);

		spyFindAll.mockImplementationOnce(async (_) => {
			return right([
				makeReply(group_id, [1, 2, 3, 4, 5], { min: 2, max: 5, created_at: dateNow }),
				makeReply(group_id, [1, 2, 3, 4, 5], { min: 1, max: 1, created_at: datePast }),
			]) as any
		})

		const msgOrError = await sut.execute({ group_id });
		expect(msgOrError.isLeft()).toBeTruthy();
	});

	it("should return error if current reply is equal to previous", async () => {
		const { sut, spyFindAll } = makeSut();
		const dateNow = new Date();
		const datePast = subWeeks(dateNow, 1);

		spyFindAll.mockImplementationOnce(async (_) => {
			return right([
				makeReply(group_id, [1, 2, 3, 4, 5], { min: 1, max: 1, created_at: dateNow }),
				makeReply(group_id, [1, 2, 3, 4, 5], { min: 1, max: 1, created_at: datePast }),
			]) as any
		})

		const msgOrError = await sut.execute({ group_id });
		expect(msgOrError.isLeft()).toBeTruthy();
		expect(msgOrError.extract()).toBeInstanceOf(CurrentNotSmallerError);
	});

	it("should call manager.findAllByGroupId with correct params", async () => {
		const { sut, spyFindAll } = makeSut();
		await sut.execute({ group_id });
		expect(spyFindAll).toHaveBeenCalledWith(group_id);
	})

	it("should return error if manager.findAllByGroupId returns error", async () => {
		const { sut, spyFindAll } = makeSut();
		spyFindAll.mockImplementationOnce(async (_) => {
			return left(new AbstractError('any_error', 400))
		})
		const msgOrError = await sut.execute({ group_id });
		expect(msgOrError.isLeft()).toBeTruthy();
	})

	it("should return error CurrentNotSmallerError if sut returns error", async () => {
		const { sut, spyFindAll } = makeSut();
		const dateNow = new Date();
		const datePast = subWeeks(dateNow, 1);

		spyFindAll.mockImplementationOnce(async (_) => {
			return right([
				makeReply(group_id, [1, 2, 3, 4, 5], { min: 1, max: 1, created_at: dateNow }),
				makeReply(group_id, [1, 2, 3, 4, 5], { min: 1, max: 1, created_at: datePast }),
			]) as any
		})

		const msgOrError = await sut.execute({ group_id });
		expect(msgOrError.extract()).toBeInstanceOf(CurrentNotSmallerError);
	})

	it("should return error if group_id is invalid", async () => {
		const { sut } = makeSut();
		const msgOrError = await sut.execute({ group_id: null as any });
		expect(msgOrError.isLeft()).toBeTruthy();
		expect(msgOrError.extract()).toBeInstanceOf(ActivityNotGroupIdProvider);
	})

	it("should return right if manager.findAllByGroupId returns array length === 1", async () => {
		const { sut, spyFindAll } = makeSut();
		spyFindAll.mockImplementationOnce(async (_) => {
			return right([{} as any])
		})
		const msgOrError = await sut.execute({ group_id });
		expect(msgOrError.isRight()).toBeTruthy();
		expect(msgOrError.extract()).toEqual({ message: "Don't have previous reply" });
	})

	it("should return right if manager.findAllByGroupId returns array length === 0", async () => {
		const { sut, spyFindAll } = makeSut();
		spyFindAll.mockImplementationOnce(async (_) => {
			return right([])
		})
		const msgOrError = await sut.execute({ group_id });
		expect(msgOrError.isRight()).toBeTruthy();
		expect(msgOrError.extract()).toEqual({ message: "Don't have previous reply" });
	})
});