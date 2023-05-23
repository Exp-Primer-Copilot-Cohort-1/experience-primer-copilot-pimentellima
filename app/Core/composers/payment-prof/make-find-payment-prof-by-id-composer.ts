import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { PaymentProfMongoRepository } from 'App/Core/domain/repositories/paymentProf/payment-prof-mongo-repository';
import { FindPaymentProfByIdUseCase } from 'App/Core/domain/use-cases/payment-prof/find-payment-prof-by-id-use-case';

export const makeFindPaymentProfByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindPaymentProfByIdUseCase(new PaymentProfMongoRepository()),
	);
};
