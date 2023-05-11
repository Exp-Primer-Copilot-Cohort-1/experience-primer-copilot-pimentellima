import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { PaymentProfMongoRepository } from 'App/Core/domain/repositories/paymentProf/payment-prof-mongo-repository';
import { UpdatePaymentProfUseCase } from 'App/Core/domain/use-cases/payment-prof/update-payment-prof-use-case';

export const makeUpdatePaymentProfByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdatePaymentProfUseCase(new PaymentProfMongoRepository()),
	);
};
