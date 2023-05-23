import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { AnswerMongoRepository } from 'App/Core/domain/repositories/answer/answer-mongo-repository';
import { FindAnswersByFormIdUseCase } from 'App/Core/domain/use-cases/answer/find-answers-by-form-id-use-case';

export const makeFindAnswersByFormIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindAnswersByFormIdUseCase(new AnswerMongoRepository()),
	);
};
