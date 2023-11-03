import { UseCase } from "App/Core/interfaces/use-case.interface"
import { IActivity } from "App/Types/IActivity"

export type IActivityExt = IActivity & {
	id: string
}

export type IMarkedActivityAwaitUseCase = UseCase<IActivityExt, IActivity>