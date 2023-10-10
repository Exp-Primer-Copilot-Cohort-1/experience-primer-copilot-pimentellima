import { AbstractError } from 'App/Core/errors/error.interface';
import { PromiseEither } from 'App/Core/shared/either';
import { IInfoReplyFormStandardFranchises, IReplyFormStandardFranchises } from 'App/Types/IReplyFormStandardFranchises';

/**
 * Interface que define os métodos para manipulação de respostas padrão de formulários de franquias.
 */

export interface RFormSFManagerInterface {
	/**
	 * Busca todas as respostas padrão de formulários de franquias de um grupo específico.
	 * @param group_id O ID do grupo de respostas.
	 * @returns Uma promessa que pode ser resolvida com um array de respostas padrão de formulários de franquias ou rejeitada com um erro abstrato.
	 */
	findAllByGroupId: (group_id: string) => PromiseEither<AbstractError, IReplyFormStandardFranchises[]>;

	/**
	 * Cria uma nova resposta padrão de formulário de franquia.
	 * @param item A resposta padrão de formulário de franquia a ser criada.
	 * @returns Uma promessa que pode ser resolvida com a resposta padrão de formulário de franquia criada ou rejeitada com um erro abstrato.
	 */
	create: (item: IReplyFormStandardFranchises) => PromiseEither<AbstractError, IReplyFormStandardFranchises>;

	findInfoThisReply: (group_id: string) => PromiseEither<AbstractError, IInfoReplyFormStandardFranchises>;
}

