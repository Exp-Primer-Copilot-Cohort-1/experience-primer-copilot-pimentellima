import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { TypeForms } from 'App/Types/IBusinessFranchises'
import { IQuestion, IReplyFormStandardFranchises } from 'App/Types/IReplyFormStandardFranchises'
import { ArrayNotEmpty, IsNumber, IsString, validateSync } from 'class-validator'
import { ActivityNotGroupIdProvider } from '../../errors/activity-not-group-id-provider'
import { InvalidParamsError } from '../../errors/invalid-params-error'
import { UnityIdNotProvidedError } from '../../errors/unit-not-id-provider'
import { Entity } from '../abstract/entity.abstract'
import { ValidationAbstractError } from '../errors/validation-error'

export class ReplyFormStandardFranchisesEntity extends Entity implements IReplyFormStandardFranchises {
	@IsNumber() version: number

	@IsString() client: string

	@IsString() prof: string

	@IsString() unity_id: string

	@IsString() franchise: string

	@IsString() activity: string

	@ArrayNotEmpty() questions: IQuestion[]

	@IsString() type: TypeForms

	@IsString() group_id: string

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
		if (!unity_id) throw new UnityIdNotProvidedError()

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

	defineType(type: TypeForms = TypeForms.START): this {
		this.type = type
		return this
	}

	defineGroupId(group_id: string): this {
		if (!group_id) throw new ActivityNotGroupIdProvider()

		this.group_id = group_id
		return this
	}

	public static async build(
		params: IReplyFormStandardFranchises,
	): PromiseEither<AbstractError, ReplyFormStandardFranchisesEntity> {
		try {
			const entity = new ReplyFormStandardFranchisesEntity()
				.defineId(params._id as string)
				.defineVersion(params.version)
				.defineClient(params.client.toString())
				.defineProf(params.prof.toString())
				.defineUnityId(params.unity_id.toString())
				.defineFranchise(params.franchise.toString())
				.defineActivity(params.activity.toString())
				.defineQuestions(params.questions)
				.defineType(params.type)
				.defineGroupId(params.group_id)

			const errors = validateSync(entity)

			if (errors.length) return left(new ValidationAbstractError(errors))

			return right(entity)
		} catch (err) {
			return left(new InvalidParamsError(err))
		}
	}
}

export default ReplyFormStandardFranchisesEntity
