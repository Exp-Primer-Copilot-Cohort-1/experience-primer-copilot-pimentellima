import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { AnswerMongoRepository } from 'App/Core/domain/repositories/answer/answer-mongo-repository';
import { FindAllAnswersUseCase } from 'App/Core/domain/use-cases/answer/find-all-answers-use-case';

export const makeFindAllAnswersComposer = (): ControllerGeneric => {
	return new Controller(
		new FindAllAnswersUseCase(new AnswerMongoRepository()),
	);
};
