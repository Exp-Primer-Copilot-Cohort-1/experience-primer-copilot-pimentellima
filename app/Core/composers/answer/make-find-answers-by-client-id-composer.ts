import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { AnswerMongoRepository } from 'App/Core/domain/repositories/answer/answer-mongo-repository';
import { FindAnswersByClientIdUseCase } from 'App/Core/domain/use-cases/answer/find-answers-by-client-id-use-case';

export const makeFindAnswersByClientIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindAnswersByClientIdUseCase(new AnswerMongoRepository()),
	);
};
