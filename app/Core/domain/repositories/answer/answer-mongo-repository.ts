import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { IAnswer } from "Types/IAnswer";
import { AnswerManagerInterface } from "../interface/answer-manager-interface";
import { AnswerEntity } from "../../entities/answer/answer";
import Answer from "App/Models/Answer";
import { MissingParamsError } from "../../errors/missing-params";
import { AnswerNotFoundError } from "../../errors/answer-not-found-error";

export class AnswerMongoRepository implements AnswerManagerInterface {
	async findAnswerById (id: string) : PromiseEither<AbstractError, AnswerEntity> {
		if (!id) return left(new MissingParamsError("id"));

		const item = await Answer.findById(id);
		if (!item) return left(new AnswerNotFoundError());

		const answerOrErr = await AnswerEntity.build(item.toObject());
		if (answerOrErr.isLeft())
			return left(new AbstractError("Internal Error", 500));

		return right(answerOrErr.extract());
	}

	async createAnswer(answer: IAnswer): PromiseEither<AbstractError, AnswerEntity> {
		const newAnswerOrErr = await AnswerEntity.build(answer);
		if (newAnswerOrErr.isLeft()) return left(newAnswerOrErr.extract());
		const newAnswer = newAnswerOrErr.extract();

		const { _id } = await Answer.create(newAnswer.params());
		newAnswer.defineId(_id.toString());
		return right(newAnswer);
	}
	async updateAnswerById(
		answer: IAnswer,
		id: string
	): PromiseEither<AbstractError, AnswerEntity> {
		const oldAnswer = await Answer.findById(id);
		if (!oldAnswer) return left(new AnswerNotFoundError());
		const answerOrErr = await AnswerEntity.build({
			...oldAnswer.toObject(),
			...answer,
		});
		if (answerOrErr.isLeft())
			return left(new AbstractError("Internal Error", 500));

		const updatedAnswer = answerOrErr.extract();

		await Answer.findByIdAndUpdate(id, updatedAnswer);
		return right(updatedAnswer);
	}

	async deleteAnswerById(id: string): PromiseEither<AbstractError, AnswerEntity> {
		if (!id) return left(new MissingParamsError("id"));

		const item = await Answer.findByIdAndDelete(id);
		if (!item) return left(new AnswerNotFoundError());

		const answerOrErr = await AnswerEntity.build(item.toObject());
		if (answerOrErr.isLeft())
			return left(new AbstractError("Internal Error", 500));

		return right(answerOrErr.extract());
	}

	async findAllAnswers(
		unity_id: string
	): PromiseEither<AbstractError, AnswerEntity[]> {
		if (!unity_id) return left(new MissingParamsError("unity id"));

		const data = await Answer.find({ unity_id });
		const answers = await Promise.all(
			data.map(async (item) => {
				const answerOrErr = await AnswerEntity.build(item.toObject());
				if (answerOrErr.isLeft()) {
					return {} as AnswerEntity;
				}
				return answerOrErr.extract();
			})
		);
		return right(answers);
	}

	async findAnswersByFormId(
		unity_id: string,
		form_id: string
	): PromiseEither<AbstractError, AnswerEntity[]> {
		if (!unity_id) return left(new MissingParamsError("unity id"));
		if (!form_id) return left(new MissingParamsError("form id"));

		const data = await Answer.find({ unity_id, form_id });
		const answers = await Promise.all(
			data.map(async (item) => {
				const answerOrErr = await AnswerEntity.build(item.toObject());
				if (answerOrErr.isLeft()) {
					return {} as AnswerEntity;
				}
				return answerOrErr.extract();
			})
		);
		return right(answers);
	}
}
