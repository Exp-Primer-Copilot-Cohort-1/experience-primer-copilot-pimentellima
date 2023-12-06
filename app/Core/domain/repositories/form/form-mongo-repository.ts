import FormEntity from 'App/Core/domain/entities/form/form'
import { FormNotFoundError } from 'App/Core/domain/errors/form-not-found-error'
import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import Form from 'App/Models/Form'
import { IForm } from 'App/Types/IForm'
import { FormManagerContract } from '../interface/form-manager-interface'

export class FormMongoRepository implements FormManagerContract {
	updateFormById: (form: IForm, id: string) => PromiseEither<AbstractError, FormEntity>
	findById: (id: string) => PromiseEither<AbstractError, FormEntity>
	async create(form: IForm): PromiseEither<AbstractError, FormEntity> {
		const newFormOrErr = await FormEntity.build({
			...form,
		})
		if (newFormOrErr.isLeft()) return left(newFormOrErr.extract())

		const newForm = newFormOrErr.extract()
		const { _id } = await Form.create(newForm.params())
		newForm.defineId(_id.toString())
		return right(newForm)
	}

	async findAll(unity_id: string): PromiseEither<AbstractError, FormEntity[]> {
		if (!unity_id) return left(new MissingParamsError('unity id'))

		const data = await Form.find({ unity_id })
		const forms = await Promise.all(
			data?.map(async (item) => {
				const formOrErr = await FormEntity.build(item.toObject())

				if (formOrErr.isLeft()) {
					return {} as FormEntity
				}
				return formOrErr.extract().params() as any
			}),
		)
		return right(forms)
	}

	async update(
		form: IForm,
		id: string,
	): PromiseEither<AbstractError, FormEntity> {
		if (!id) return left(new MissingParamsError('id'))
		const oldForm = await Form.findById(id)
		if (!oldForm) return left(new FormNotFoundError())
		const newFormOrErr = await FormEntity.build({
			...oldForm.toObject(),
			...form,
		})
		if (newFormOrErr.isLeft()) return left(new AbstractError('Invalid params', 400))
		const newForm = newFormOrErr.extract()

		await Form.findByIdAndUpdate(id, newForm.params())
		return right(newForm)
	}

	async findFormsByProfId(
		unity_id: string,
		prof_id: string,
	): PromiseEither<AbstractError, FormEntity[]> {
		if (!unity_id) return left(new MissingParamsError('unity id'))
		if (!prof_id) return left(new MissingParamsError('prof id'))

		const data = await Form.find({ unity_id, prof_id })
		const forms = await Promise.all(
			data?.map(async (item) => {
				const formOrErr = await FormEntity.build(item.toObject())
				if (formOrErr.isLeft()) {
					return {} as FormEntity
				}
				return formOrErr.extract().params() as any
			}),
		)
		return right(forms)
	}

	async findFormsByCategoryId(
		unity_id: string,
		category_id: string,
	): PromiseEither<AbstractError, FormEntity[]> {
		if (!unity_id) return left(new MissingParamsError('unity id'))
		if (!category_id) return left(new MissingParamsError('category id'))

		const data = await Form.find({ unity_id, category_id })
		const forms = await Promise.all(
			data?.map(async (item) => {
				const formOrErr = await FormEntity.build(item.toObject())
				if (formOrErr.isLeft()) {
					return {} as FormEntity
				}
				return formOrErr.extract()
			}),
		)
		return right(forms)
	}

	async findFormById(id: string): PromiseEither<AbstractError, FormEntity> {
		if (!id) return left(new MissingParamsError('id'))

		const item = await Form.findOne({ _id: id })
		if (!item) return left(new FormNotFoundError())

		const formOrErr = await FormEntity.build(item.toObject())
		if (formOrErr.isLeft()) return left(new AbstractError('Internal Error', 500))

		return right(formOrErr.extract())
	}

	async deleteFormById(id: string): PromiseEither<AbstractError, FormEntity> {
		if (!id) return left(new MissingParamsError('id'))

		const item = await Form.findByIdAndDelete(id)
		if (!item) return left(new FormNotFoundError())

		const formOrErr = await FormEntity.build(item.toObject())
		if (formOrErr.isLeft()) return left(new AbstractError('Internal Error', 500))

		return right(formOrErr.extract())
	}
}
