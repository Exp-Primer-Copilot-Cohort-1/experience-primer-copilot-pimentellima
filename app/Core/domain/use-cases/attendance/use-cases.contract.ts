import { UseCase } from "App/Core/interfaces/use-case.interface"

export type IProductStockDepletionUseCase = UseCase<{
	id: string
}, Message>