import { ControllerInjection } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query';
import { CreatePartnersUseCase, FindPartnersByUnityUseCase, UpdatePartnersByIdUseCase } from 'App/Core/domain/use-cases/partner';

export const makePartnerCreateComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreatePartnersUseCase)
}

export const makePartnerUpdateComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(UpdatePartnersByIdUseCase)
}

export const makePartnerFindByUnityComposer = (opts: OptsQuery): ControllerGeneric => {
	return ControllerInjection.resolve(FindPartnersByUnityUseCase, opts)
};

