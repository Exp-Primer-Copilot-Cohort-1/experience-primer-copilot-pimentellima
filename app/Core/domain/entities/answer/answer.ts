import { IQuestion, IAnswerOption, IAnswer } from "Types/IAnswer";
import { Entity } from "../abstract/entity.abstract";
import { ObjectId } from "mongoose";
import { PromiseEither, left, right } from "App/Core/shared";
import { AbstractError } from "App/Core/errors/error.interface";

export class AnswerEntity extends Entity implements IAnswer {
	private _name: string;
	private _client_id: string | ObjectId;
	private _prof_id: string | ObjectId;
	private _activity_id: string | ObjectId;
	private _answers: IAnswerOption[];
	private _questions: IQuestion[];
	private _category_id: string | ObjectId;
	private _unity_id: string | ObjectId;
	private _active: boolean;
    private _form_id: string | ObjectId;

	defineName(name: string): AnswerEntity {
		this._name = name;
		return this;
	}

	defineClientId(client_id : string | ObjectId) : AnswerEntity {
		this._client_id = client_id;
		return this;
	}

	defineProfId(prof_id : string | ObjectId) : AnswerEntity {
		this._prof_id = prof_id;
		return this;
	}

	defineActivityId(activity_id : string | ObjectId) : AnswerEntity {
		this._activity_id = activity_id;
		return this;
	}

	defineAnswers(answers : IAnswerOption[]) : AnswerEntity {
		this._answers = answers;
		return this;
	}

    defineFormId(form_id: string | ObjectId) {
        this._form_id = form_id;
        return this;
    }

	defineQuestions(questions: IQuestion[]): AnswerEntity {
		this._questions = questions;
		return this;
	}

	defineCategoryId(category_id: string | ObjectId): AnswerEntity {
		this._category_id = category_id;
		return this;
	}

	defineUnityId(unity_id: string | ObjectId): AnswerEntity {
		this._unity_id = unity_id;
		return this;
	}

	defineActive(active: boolean): AnswerEntity {
		this._active = active;
		return this;
	}

	public get name(): string {
		return this._name;
	}

	public get client_id() : string | ObjectId {
		return this._client_id;
	}

	public get prof_id() : string | ObjectId {
		return this._prof_id;
	}

	public get activity_id() : string | ObjectId {
		return this._activity_id;
	}

	public get answers() : IAnswerOption[] {
		return this._answers;
	}

	public get questions(): IQuestion[] {
		return this._questions;
	}

	public get category_id(): string | ObjectId {
		return this._category_id;
	}

	public get unity_id(): string | ObjectId {
		return this._unity_id;
	}

	public get active(): boolean {
		return this._active;
	}

    public get form_id(): string | ObjectId {
        return this._form_id;
    }

	public static async build(
		params: IAnswer
	): PromiseEither<AbstractError, AnswerEntity> {
        try {
            return right(new AnswerEntity()
                .defineId(params._id?.toString())
                .defineName(params.name)
				.defineClientId(params.client_id)
				.defineProfId(params.prof_id)
				.defineActivityId(params.activity_id)
                .defineFormId(params.form_id)
                .defineActive(params.active)
                .defineCategoryId(params.category_id)
                .defineUnityId(params.unity_id)
                .defineQuestions(params.questions)
            )
        }
        catch(error) {
            return left(new AbstractError("", 500, error));
        }
    }
}
