import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IBusinessFranchises } from 'App/Types/IBusinessFranchises'
import { UnitNotFranchise } from '../../errors/unit-not-franchise'

/**
 * Interface que define o contrato para o gerenciador de franquias de negócios.
 */
export interface BusinessFranchisesManagerInterface {
	/**
	 * Busca a franquia pelo ID da unidade.
	 * @param unity_id O ID da unidade da franquia de negócio a ser buscada.
	 * @returns {UnitNotFranchise} Uma promessa que pode ser resolvida com a franquia de negócio encontrada ou rejeitada com um erro abstrato.
	 * @left UnitNotFranchise - Caso a unidade não seja uma franquia de negócio.
	 * @throws Caso ocorra algum erro ao buscar a franquia de negócio no banco de dados.
	 */
	findByUnityId: (unity_id: string) => PromiseEither<AbstractError, IBusinessFranchises>
}
