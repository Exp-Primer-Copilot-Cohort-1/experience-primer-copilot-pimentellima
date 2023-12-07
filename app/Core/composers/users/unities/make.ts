import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
    FindAllUnityByNameUseCase,
    ShowUnityByIdUseCase,
    UpdateUnitiesByIdUseCase,
} from 'App/Core/domain/use-cases'
import { UpdateUnityPictureUseCase } from 'App/Core/domain/use-cases/users/unities/update-unity-picture-use-case'

export const makeUnityFindAllByNameComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(FindAllUnityByNameUseCase)
}

export const makeUnityUpdateByIdComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(UpdateUnitiesByIdUseCase)
}

export const makeUpdateUnityPictureComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(UpdateUnityPictureUseCase)
}

export const makeUnityShowByIdComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(ShowUnityByIdUseCase)
}
// export const makeUnityShowByIdComposer = (): ControllerGeneric =>
//     ControllerInjection.resolve(ShowUnityByIdUseCase)

// export const makeUnityUpdateByIdComposer = (): ControllerGeneric =>
//     ControllerInjection.resolve(UpdateUnitiesByIdUseCase)

// export const makeUnityFindAllByNameComposer = (): ControllerGeneric =>
//     ControllerInjection.resolve(FindAllUnityByNameUseCase)
