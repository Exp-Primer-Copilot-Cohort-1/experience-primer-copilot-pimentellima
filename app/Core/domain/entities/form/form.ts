import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IForm, IQuestion } from 'Types/IForm'
import { IProf } from 'Types/IProf'
import { Schema } from 'mongoose'
import { z } from 'zod'
import { Entity } from '../abstract/entity.abstract'

export class FormEntity extends Entity implements IForm {
	private _name: string
	private _questions: IQuestion[]
	private _category_id: string | Schema.Types.ObjectId
	private _prof: IProf
	private _unity_id: string | Schema.Types.ObjectId
	private _active: boolean

	public defineName(name: string): FormEntity {
		this._name = name
		return this
	}

	public defineQuestions(questions: IQuestion[]): FormEntity {
		this._questions = questions
		return this
	}

	public defineCategoryId(categoryId: string | Schema.Types.ObjectId): FormEntity {
		this._category_id = categoryId
		return this
	}

	public defineProf(prof: IProf): FormEntity {
		this._prof = prof
		return this
	}

	public defineUnityId(unityId: string | Schema.Types.ObjectId): FormEntity {
		this._unity_id = unityId
		return this
	}

	public defineActive(active = true): FormEntity {
		this._active = active
		return this
	}

	public get name(): string {
		return this._name
	}

	public get questions(): IQuestion[] {
		return this._questions
	}

	public get category_id(): string | Schema.Types.ObjectId {
		return this._category_id
	}

	public get prof(): IProf {
		return this._prof
	}

	public get unity_id(): string | Schema.Types.ObjectId {
		return this._unity_id
	}

	public get active(): boolean {
		return this._active
	}

	public static async build(params: IForm): PromiseEither<AbstractError, FormEntity> {
		try {
			const schema = z.object({
				name: z.string(),
				prof: z.object({
					value: z.string(),
					label: z.string(),
				}),
				unity_id: z.string(),
			})

			schema.parse({
				...params,
				unity_id: params.unity_id.toString(),
				category_id: params.category_id.toString()
			})
			return right(
				new FormEntity()
					.defineId(params._id?.toString())
					.defineName(params.name)
					.defineQuestions(params.questions)
					.defineActive(params.active)
					.defineCategoryId(params.category_id)
					.defineProf(params.prof)
					.defineUnityId(params.unity_id?.toString()),
			)
		} catch (err) {
			console.log(err)
			return left(new AbstractError(err, 500))
		}
	}
}

export default FormEntity
