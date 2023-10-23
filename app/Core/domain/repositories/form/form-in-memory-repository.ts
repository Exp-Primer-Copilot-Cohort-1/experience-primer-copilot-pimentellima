import FormEntity from "App/Core/domain/entities/form/form";
import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { IForm } from "App/Types/IForm";
import { FormNotFoundError } from "../../errors/form-not-found-error";
import { MissingParamsError } from "../../errors/missing-params";
import { FormManagerInterface } from "../interface/form-manager-interface";

export class FormInMemoryRepository implements FormManagerInterface {
	public forms: any[] = [];

	async create(form: IForm): PromiseEither<AbstractError, FormEntity> {
		const newFormOrErr = await FormEntity.build(form);
		if (newFormOrErr.isLeft()) return left(newFormOrErr.extract());

		const newForm = newFormOrErr.extract();
		return right(newForm);
	}

	async findAll(
		unity_id: string
	): PromiseEither<AbstractError, FormEntity[]> {
		if (!unity_id) return left(new MissingParamsError("unity id"));

		const data = this.forms.filter((form) => form.unity_id === unity_id);
		const forms = await Promise.all(
			data.map(async (item) => {
				const formOrErr = await FormEntity.build(item);
				if (formOrErr.isLeft()) {
					return {} as FormEntity;
				}
				return formOrErr.extract();
			})
		);
		return right(forms);
	}

	async update(
		form: IForm,
		id: string
	): PromiseEither<AbstractError, FormEntity> {
		if (!id) return left(new MissingParamsError("id"));
		const oldForm = this.forms.find((form) => form._id === id);
		if (!oldForm) return left(new FormNotFoundError());
		const newFormOrErr = await FormEntity.build({
			...oldForm,
			...form,
		});
		if (newFormOrErr.isLeft())
			return left(new AbstractError("Invalid params", 400));
		const newForm = newFormOrErr.extract();

		return right(newForm);
	}

	async findFormsByProfId(
		unity_id: string,
		prof_id: string
	): PromiseEither<AbstractError, FormEntity[]> {
		if (!unity_id) return left(new MissingParamsError("unity id"));
		if (!prof_id) return left(new MissingParamsError("prof id"));

		const data = this.forms.filter(
			(form) => form.unity_id === unity_id && form.prof_id === prof_id
		);
		const forms = await Promise.all(
			data.map(async (item) => {
				const formOrErr = await FormEntity.build(item);
				if (formOrErr.isLeft()) {
					return {} as FormEntity;
				}
				return formOrErr.extract();
			})
		);
		return right(forms);
	}
	async findFormsByCategoryId(
		unity_id: string,
		category_id: string
	): PromiseEither<AbstractError, FormEntity[]> {
		if (!unity_id) return left(new MissingParamsError("unity id"));
		if (!category_id) return left(new MissingParamsError("category id"));

		const data = this.forms.filter(
			(form) => form.unity_id === unity_id && form.category_id === category_id
		);
		const forms = await Promise.all(
			data.map(async (item) => {
				const formOrErr = await FormEntity.build(item);
				if (formOrErr.isLeft()) {
					return {} as FormEntity;
				}
				return formOrErr.extract();
			})
		);
		return right(forms);
	}
	async findById(id: string): PromiseEither<AbstractError, FormEntity> {
		if (!id) return left(new MissingParamsError("id"));

		const item = this.forms.find(form => form._id === id);
		if (!item) return left(new FormNotFoundError());

		const formOrErr = await FormEntity.build(item);
		if (formOrErr.isLeft())
			return left(new AbstractError("Internal Error", 500));

		return right(formOrErr.extract());
	}

	deleteFormById: (id: string) => PromiseEither<AbstractError, FormEntity>;
}
