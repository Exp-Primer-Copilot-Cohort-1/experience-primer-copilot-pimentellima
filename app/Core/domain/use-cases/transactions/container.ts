
import { TransactionsMongooseRepository } from "App/Core/domain/repositories";
import {
	CreateOnlyOneTransactionUseCase,
	CreateTransactionUseCase,
	CreateWithProceduresTransactionUseCase
} from "App/Core/domain/use-cases/transactions";
import container from 'App/Core/shared/container';
import { TransactionsManagerInterface } from "../../repositories/interface/transactions-manager-interface";

container.registerSingleton<TransactionsManagerInterface>(
	TransactionsMongooseRepository,
	TransactionsMongooseRepository
);

container.registerSingleton<CreateOnlyOneTransactionUseCase>(
	CreateOnlyOneTransactionUseCase,
	CreateOnlyOneTransactionUseCase
);

container.registerSingleton<CreateTransactionUseCase>(
	CreateTransactionUseCase,
	CreateTransactionUseCase
);

container.registerSingleton<CreateWithProceduresTransactionUseCase>(
	CreateWithProceduresTransactionUseCase,
	CreateWithProceduresTransactionUseCase
);


export { container };
