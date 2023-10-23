import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared'
import { IAnswer } from 'App/Types/IAnswer'

export interface AnswerManagerContract {
	createAnswer: (answer: IAnswer) => PromiseEither<AbstractError, IAnswer>
	updateAnswerById: (
		answer: IAnswer,
		id: string,
	) => PromiseEither<AbstractError, IAnswer>
	deleteAnswerById: (id: string) => PromiseEither<AbstractError, IAnswer>
	findAllAnswers: (unity_id: string) => PromiseEither<AbstractError, IAnswer[]>
	findAnswerById: (id: string) => PromiseEither<AbstractError, IAnswer>
	findAnswersByFormId: (
		unity_id: string,
		form_id: string,
	) => PromiseEither<AbstractError, IAnswer[]>
	findAnswersByClientId: (
		unity_id: string,
		client_id: string,
	) => PromiseEither<AbstractError, IAnswer[]>
}
