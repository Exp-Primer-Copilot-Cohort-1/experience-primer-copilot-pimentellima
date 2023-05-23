import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { PaymentProfMongoRepository } from 'App/Core/domain/repositories/paymentProf/payment-prof-mongo-repository';
import { DeletePaymentProfByIdUseCase } from 'App/Core/domain/use-cases/payment-prof/delete-payment-prof-use-case';

export const makeDeletePaymentProfByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new DeletePaymentProfByIdUseCase(new PaymentProfMongoRepository()),
	);
};
