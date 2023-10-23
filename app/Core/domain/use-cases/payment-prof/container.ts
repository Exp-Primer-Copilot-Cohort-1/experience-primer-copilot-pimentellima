import { PaymentProfMongoRepository } from "App/Core/domain/repositories";
import { PaymentProfManagerContract } from "App/Core/domain/repositories/interface";
import container from 'App/Core/shared/container';
import {
	CreatePaymentProfUseCase,
	FindAllPaymentProfsUseCase
} from "./index";

container.registerSingleton<PaymentProfManagerContract>(
	PaymentProfMongoRepository,
	PaymentProfMongoRepository
);

container.registerSingleton<CreatePaymentProfUseCase>(
	CreatePaymentProfUseCase,
	CreatePaymentProfUseCase
);

container.registerSingleton<FindAllPaymentProfsUseCase>(
	FindAllPaymentProfsUseCase,
	FindAllPaymentProfsUseCase
);

export { container };
