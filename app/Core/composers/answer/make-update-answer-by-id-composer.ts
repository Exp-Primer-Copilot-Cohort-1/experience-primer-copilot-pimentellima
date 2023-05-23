import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { AnswerMongoRepository } from 'App/Core/domain/repositories/answer/answer-mongo-repository';
import { UpdateAnswerByIdUseCase } from 'App/Core/domain/use-cases/answer/update-answer-by-id-use-case';

export const makeUpdateAnswerByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateAnswerByIdUseCase(new AnswerMongoRepository()),
	);
};
