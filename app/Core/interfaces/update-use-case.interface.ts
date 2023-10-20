import { AbstractError } from "../errors/error.interface";
import { PromiseEither } from "../shared";

interface UpdateRepo<In, Out> {
	updateById: (entity: In, unity_id: string) => PromiseEither<AbstractError, Out>
}

export interface StaticEntity<In> {
	build: (data: In) => PromiseEither<AbstractError, In>
}

export interface UpdateUseCase<In, Out> {

	entity: StaticEntity<Out>
	manager: UpdateRepo<In, Out>

	/**
	 * Método que executa o caso de uso.
	 * @param body Corpo da requisição.
	 * @returns Uma promessa que pode ser resolvida com um valor de sucesso ou um erro.
	 */
	execute: (body?: In) => PromiseEither<AbstractError, Out>;
}