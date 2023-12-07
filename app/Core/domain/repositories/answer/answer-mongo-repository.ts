import { AnswerEntity } from 'App/Core/domain/entities/answer/answer'
import { AnswerNotFoundError } from 'App/Core/domain/errors/answer-not-found-error'
import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import Answer from 'App/Models/FormAnswer'
import { IAnswer } from 'Types/IFormSubmission'
import { AnswerManagerContract } from '../interface/answer-manager-interface'

export class AnswerMongoRepository implements AnswerManagerContract {
	async findAnswerById(id: string): PromiseEither<AbstractError, IAnswer> {
		if (!id) return left(new MissingParamsError('id'))

		const item = await Answer.findById(id)
		if (!item) return left(new AnswerNotFoundError())

		const answerOrErr = await AnswerEntity.build(item.toObject())
		if (answerOrErr.isLeft()) return left(new AbstractError('Internal Error', 500))

		return right(answerOrErr.extract().params())
	}

	async createAnswer(answer: IAnswer): PromiseEither<AbstractError, IAnswer> {
		const newAnswerOrErr = await AnswerEntity.build(answer)
		if (newAnswerOrErr.isLeft()) return left(newAnswerOrErr.extract())
		const newAnswer = newAnswerOrErr.extract()

		const { _id } = await Answer.create(newAnswer.params())
		newAnswer.defineId(_id.toString())
		return right(newAnswer.params())
	}
	async updateAnswerById(
		answer: IAnswer,
		id: string,
	): PromiseEither<AbstractError, IAnswer> {
		const oldAnswer = await Answer.findById(id)
		if (!oldAnswer) return left(new AnswerNotFoundError())
		const answerOrErr = await AnswerEntity.build({
			...oldAnswer.toObject(),
			...answer,
		})
		if (answerOrErr.isLeft()) return left(new AbstractError('Internal Error', 500))

		const updatedAnswer = answerOrErr.extract()

		await Answer.findByIdAndUpdate(id, updatedAnswer)
		return right(updatedAnswer.params())
	}

	async deleteAnswerById(id: string): PromiseEither<AbstractError, IAnswer> {
		if (!id) return left(new MissingParamsError('id'))

		const item = await Answer.findByIdAndDelete(id)
		if (!item) return left(new AnswerNotFoundError())

		const answerOrErr = await AnswerEntity.build(item.toObject())
		if (answerOrErr.isLeft()) return left(new AbstractError('Internal Error', 500))

		return right(answerOrErr.extract().params())
	}

	async findAllAnswers(unity_id: string): PromiseEither<AbstractError, IAnswer[]> {
		if (!unity_id) return left(new MissingParamsError('unity id'))

		const data = await Answer.find({ unity_id })
		const answers = await Promise.all(
			data?.map(async (item) => {
				const answerOrErr = await AnswerEntity.build(item.toObject())
				if (answerOrErr.isLeft()) {
					return {} as AnswerEntity
				}
				return answerOrErr.extract().params()
			}),
		)
		return right(answers)
	}

	async findAnswersByClientId(
		unity_id: string,
		client_id: string,
	): PromiseEither<AbstractError, IAnswer[]> {
		if (!unity_id) return left(new MissingParamsError('unity id'))
		if (!client_id) return left(new MissingParamsError('client id'))

		const data = await Answer.find({ unity_id, client_id })
		const answers = await Promise.all(
			data?.map(async (item) => {
				const answerOrErr = await AnswerEntity.build(item.toObject())
				if (answerOrErr.isLeft()) {
					return {} as AnswerEntity
				}
				return answerOrErr.extract().params()
			}),
		)
		return right(answers)
	}

	async findAnswersByFormId(
		unity_id: string,
		form_id: string,
	): PromiseEither<AbstractError, IAnswer[]> {
		if (!unity_id) return left(new MissingParamsError('unity id'))
		if (!form_id) return left(new MissingParamsError('form id'))

		const data = await Answer.find({ unity_id, form_id })
		const answers = await Promise.all(
			data?.map(async (item) => {
				const answerOrErr = await AnswerEntity.build(item.toObject())
				if (answerOrErr.isLeft()) {
					return {} as AnswerEntity
				}
				return answerOrErr.extract().params()
			}),
		)
		return right(answers)
	}
}
