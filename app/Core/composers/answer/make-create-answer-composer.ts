import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { AnswerMongoRepository } from 'App/Core/domain/repositories/answer/answer-mongo-repository';
import { CreateAnswerUseCase } from 'App/Core/domain/use-cases/answer/create-answer-use-case';

export const makeCreateAnswerComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateAnswerUseCase(new AnswerMongoRepository()),
	);
};
