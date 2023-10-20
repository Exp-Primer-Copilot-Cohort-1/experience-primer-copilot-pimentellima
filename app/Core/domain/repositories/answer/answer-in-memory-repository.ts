import { AnswerEntity } from 'App/Core/domain/entities/answer/answer'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IAnswer } from 'Types/IFormSubmission'
import { AnswerNotFoundError } from '../../errors/answer-not-found-error'
import { MissingParamsError } from '../../errors/missing-params'
import { AnswerManagerInterface } from '../interface/answer-manager-interface'

export class AnswerInMemoryRepository implements AnswerManagerInterface {
	public answers: any[] = []
	findAnswersByClientId: (
		unity_id: string,
		client_id: string,
	) => PromiseEither<AbstractError, AnswerEntity[]>

	findAnswerById: (id: string) => PromiseEither<AbstractError, AnswerEntity>
	async createAnswer(answer: IAnswer): PromiseEither<AbstractError, AnswerEntity> {
		const newAnswerOrErr = await AnswerEntity.build(answer)
		if (newAnswerOrErr.isLeft()) return left(newAnswerOrErr.extract())
		const newAnswer = newAnswerOrErr.extract()

		return right(newAnswer)
	}
	async updateAnswerById(
		answer: IAnswer,
		id: string,
	): PromiseEither<AbstractError, AnswerEntity> {
		if (!id) return left(new MissingParamsError(id))
		const oldAnswer = this.answers.find((ans) => ans._id === id)
		if (!oldAnswer) return left(new AnswerNotFoundError())
		const answerOrErr = await AnswerEntity.build({
			...oldAnswer,
			...answer,
		})
		if (answerOrErr.isLeft()) return left(new AbstractError('Internal Error', 500))

		const updatedAnswer = answerOrErr.extract()

		return right(updatedAnswer)
	}

	deleteAnswerById: (id: string) => PromiseEither<AbstractError, AnswerEntity>

	async findAllAnswers(unity_id: string): PromiseEither<AbstractError, AnswerEntity[]> {
		if (!unity_id) return left(new MissingParamsError('unity id'))

		const data = this.answers.filter((ans) => ans.unity_id === unity_id)
		const answers = await Promise.all(
			data.map(async (item) => {
				const answerOrErr = await AnswerEntity.build(item)
				if (answerOrErr.isLeft()) {
					return {} as AnswerEntity
				}
				return answerOrErr.extract()
			}),
		)
		return right(answers)
	}

	async findAnswersByFormId(
		unity_id: string,
		form_id: string,
	): PromiseEither<AbstractError, AnswerEntity[]> {
		if (!unity_id) return left(new MissingParamsError('unity id'))
		if (!form_id) return left(new MissingParamsError('form id'))

		const data = this.answers.filter(
			(ans) => ans.unity_id === unity_id && ans.form_id === form_id,
		)
		const answers = await Promise.all(
			data.map(async (item) => {
				const answerOrErr = await AnswerEntity.build(item)
				if (answerOrErr.isLeft()) {
					return {} as AnswerEntity
				}
				return answerOrErr.extract()
			}),
		)
		return right(answers)
	}
}
