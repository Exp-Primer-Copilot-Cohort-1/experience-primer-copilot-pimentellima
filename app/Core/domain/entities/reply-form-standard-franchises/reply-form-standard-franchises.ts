/* eslint-disable @typescript-eslint/naming-convention */
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IQuestion, IReplyFormStandardFranchises } from 'App/Types/IReplyFormStandardFranchises'
import { ArrayNotEmpty, IsNumber, IsString } from 'class-validator'
import { InvalidParamsError } from '../../errors/invalid-params-error'
import { Entity } from '../abstract/entity.abstract'

export class ReplyFormStandardFranchisesEntity extends Entity implements IReplyFormStandardFranchises {
	@IsNumber() version: number

	@IsString() client: string

	@IsString() prof: string

	@IsString() unity_id: string

	@IsString() franchise: string

	@IsString() activity: string

	@ArrayNotEmpty() questions: IQuestion[]

	private constructor() {
		super()
	}

	defineVersion(version: number): this {
		this.version = version
		return this
	}

	defineClient(client: string): this {
		this.client = client
		return this
	}

	defineProf(prof: string): this {
		this.prof = prof
		return this
	}

	defineUnityId(unity_id: string): this {
		this.unity_id = unity_id
		return this
	}

	defineFranchise(franchise: string): this {
		this.franchise = franchise
		return this
	}

	defineActivity(activity: string): this {
		this.activity = activity
		return this
	}

	defineQuestions(questions: IQuestion[]): this {
		this.questions = questions
		return this
	}

	public static async build(
		params: IReplyFormStandardFranchises,
	): PromiseEither<AbstractError, ReplyFormStandardFranchisesEntity> {
		try {

			return right(
				new ReplyFormStandardFranchisesEntity()
					.defineId(params._id as string)
					.defineVersion(params.version)
					.defineClient(params.client.toString())
					.defineProf(params.prof.toString())
					.defineUnityId(params.unity_id.toString())
					.defineFranchise(params.franchise.toString())
					.defineActivity(params.activity.toString())
					.defineQuestions(params.questions)
			)
		} catch (err) {
			return left(new InvalidParamsError(err))
		}
	}
}

export default ReplyFormStandardFranchisesEntity
