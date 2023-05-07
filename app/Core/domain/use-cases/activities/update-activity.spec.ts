import { AppointmentStatus } from "App/Helpers";
import { describe, expect, it } from "vitest";
import { ConflictingScheduleError } from "../../errors/ conflicting-schedule-error";
import { ActivityInMemoryRepository } from "../../repositories/activities/activity-in-memory-repository";
import { UpdateActivityUseCase } from "./update-activity-use-case";
import { makeValidActivity } from "tests/functional/helpers/makeValidActivity";

describe("Update activity (Unit)", () => {
	it("should update activity active attribute", async () => {
		const repo = new ActivityInMemoryRepository();
		const validActivity = makeValidActivity();
		repo.activities = [validActivity];
		const sut = new UpdateActivityUseCase(repo);

		const updatedActivity = {
			...validActivity,
			active: false,
		};

		const query = {
			id: validActivity._id,
			activity: updatedActivity,
		} as any;

		const respOrErr = await sut.execute(query);
		if (respOrErr.isLeft()) {
			throw Error();
		}
		expect(respOrErr.extract().active).toBe(false);
	});

	it("should change activity status to rescheduled", async () => {
		const repo = new ActivityInMemoryRepository();
		const validActivity = makeValidActivity();
		repo.activities = [validActivity];
		const sut = new UpdateActivityUseCase(repo);

		const hour_end = new Date(validActivity.hour_start);
		hour_end.setHours(validActivity.hour_start.getHours() + 1);

		const updatedActivity = {
			...validActivity,
			hour_end,
		};

		const query = {
			id: validActivity._id,
			activity: updatedActivity,
		} as any;

		const respOrErr = await sut.execute(query);
		if (respOrErr.isLeft()) throw Error();
		expect(respOrErr.extract().status).toBe(AppointmentStatus.RESCHEDULED);
	});

	it("should throw ConflictingScheduleError", async () => {
		const repo = new ActivityInMemoryRepository();
		const activityOne = makeValidActivity();
		const activityTwo = makeValidActivity();
		repo.activities = [activityOne, activityTwo];
		const sut = new UpdateActivityUseCase(repo);

		const updatedActivity = {
			...activityTwo,
			date: new Date(activityOne.date),
			hour_start: new Date(activityOne.hour_start),
			hour_end: new Date(activityOne.hour_end),
		};

		const query = {
			id: activityTwo._id,
			activity: updatedActivity,
		} as any;

		const respOrErr = await sut.execute(query);
		expect(respOrErr.isLeft()).toBeTruthy();
		expect(respOrErr.extract()).toBeInstanceOf(ConflictingScheduleError);
	});

	it(`should update hour_start and hour_end with the same values of an existing activity 
		but with different day`, async () => {
		const repo = new ActivityInMemoryRepository();
		const activityOne = makeValidActivity();
		const activityTwo = makeValidActivity();
		repo.activities = [activityOne, activityTwo];
		const sut = new UpdateActivityUseCase(repo);

		const date = new Date(activityOne.date.getDate());
		date.setFullYear(5000);
		const hour_start = new Date(date);
		const hour_end = new Date(date);
		hour_start.setHours(activityOne.hour_start.getHours());
		hour_end.setHours(activityOne.hour_end.getHours());

		const updatedActivity = {
			...activityTwo,
			date,
			hour_start,
			hour_end,
		};

		const query = {
			id: activityTwo._id,
			activity: updatedActivity,
		} as any;

		const respOrErr = await sut.execute(query);
		expect(respOrErr.isRight()).toBeTruthy();
	});

	it("should not change activity status", async () => {
		const repo = new ActivityInMemoryRepository();
		const validActivity = makeValidActivity();
		repo.activities = [validActivity];
		const sut = new UpdateActivityUseCase(repo);

		const updatedActivity = {
			...validActivity,
		};

		const query = {
			id: validActivity._id,
			activity: updatedActivity,
		} as any;

		const respOrErr = await sut.execute(query);
		if (respOrErr.isLeft()) throw Error();
		expect(respOrErr.extract().status).toBe(validActivity.status);
	});
});
