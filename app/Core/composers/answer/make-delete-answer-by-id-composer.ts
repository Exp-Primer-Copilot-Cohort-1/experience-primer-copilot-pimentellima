import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { AnswerMongoRepository } from 'App/Core/domain/repositories/answer/answer-mongo-repository';
import { DeleteAnswerByIdUseCase } from 'App/Core/domain/use-cases/answer/delete-answer-by-id-use-case';

export const makeDeleteAnswerByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new DeleteAnswerByIdUseCase(new AnswerMongoRepository()),
	);
};
