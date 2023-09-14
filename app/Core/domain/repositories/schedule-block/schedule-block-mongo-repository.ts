import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import ScheduleBlock from "App/Models/ScheduleBlock";
import { IScheduleBlock, ScheduleBlockParams } from "App/Types/IScheduleBlock";
import { ScheduleBlockEntity } from "../../entities/schedule-block/ScheduleBlock";
import { MissingParamsError } from "../../errors/missing-params";
import { ScheduleBlockManagerInterface } from "../interface/schedule-block-manager-interface";

export class ScheduleBlockMongoRepository
	implements ScheduleBlockManagerInterface {
	async createScheduleBlock(
		unity_id: string,
		schedule_block: ScheduleBlockParams
	): PromiseEither<AbstractError, IScheduleBlock> {
		if (!unity_id) return left(new MissingParamsError("unity_id"));
		const scheduleBlockOrErr = await ScheduleBlockEntity.build(
			schedule_block
		);
		if (scheduleBlockOrErr.isLeft())
			return left(scheduleBlockOrErr.extract());

		const newActivity = await ScheduleBlock.create(
			scheduleBlockOrErr.extract().defineUnityId(unity_id).params()
		);
		return right(newActivity);
	}

	async findAllScheduleBlock(
		unity_id: string
	): PromiseEither<AbstractError, IScheduleBlock[]> {
		if (!unity_id) return left(new MissingParamsError("unity_id"));
		const scheduleBlocks = await ScheduleBlock.find({ unity_id });
		return right(scheduleBlocks);
	}

	async findScheduleBlocksByProfId(
		unity_id: string,
		prof_id: string
	): PromiseEither<AbstractError, IScheduleBlock[]> {
		if (!unity_id) return left(new MissingParamsError("unity_id"));
		if (!prof_id) return left(new MissingParamsError("prof_id"));
		const scheduleBlocks = await ScheduleBlock.find({
			unity_id,
			"prof.value": prof_id,
		});
		return right(scheduleBlocks);
	}

	async deleteScheduleBlock(
		id: string
	): PromiseEither<AbstractError, IScheduleBlock> {
		if (!id) return left(new MissingParamsError("id"));
		const scheduleBlock = await ScheduleBlock.findByIdAndDelete(id);
		if (!scheduleBlock)
			return left(new AbstractError("Schedule block not found", 404));
		return right(scheduleBlock);
	}
}
