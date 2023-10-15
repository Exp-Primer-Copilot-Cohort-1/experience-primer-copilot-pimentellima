import { PromiseEither } from 'App/Core/shared/either';
import { AbstractError } from '../errors/error.interface';


/**
 * Interface genérica para casos de uso.
 * @template In Tipo de entrada para o caso de uso.
 * @template Out Tipo de saída para o caso de uso.
 */
export interface UseCase<In, Out> {
	/**
	 * Método que executa o caso de uso.
	 * @param body Corpo da requisição.
	 * @param args Argumentos adicionais.
	 * @returns Uma promessa que pode ser resolvida com um valor de sucesso ou um erro.
	 */
	execute: (body?: In, ...args: any) => PromiseEither<AbstractError, Out>;
}


