import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither } from "App/Core/shared";
import { IAnswer } from "Types/IAnswer";
import { AnswerEntity } from "../../entities/answer/answer";

export interface AnswerManagerInterface {
    createAnswer: (answer : IAnswer) => PromiseEither<AbstractError, AnswerEntity>;
    updateAnswerById: (answer : IAnswer, id: string) => PromiseEither<AbstractError, AnswerEntity>;
    deleteAnswerById: (id: string) => PromiseEither<AbstractError, AnswerEntity>;
    findAllAnswers: (unity_id: string) => PromiseEither<AbstractError, AnswerEntity[]>;
    findAnswerById: (id: string) => PromiseEither<AbstractError, AnswerEntity>;
    findAnswersByFormId: (unity_id: string, form_id: string) => PromiseEither<AbstractError, AnswerEntity[]>;
}