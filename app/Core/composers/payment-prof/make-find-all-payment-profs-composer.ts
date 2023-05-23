import { Controller } from 'App/Core/adapters/controller';
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers';
import { PaymentProfMongoRepository } from 'App/Core/domain/repositories/paymentProf/payment-prof-mongo-repository';
import { FindAllPaymentProfsUseCase } from 'App/Core/domain/use-cases/payment-prof/find-all-payment-profs-use-case';

export const makeFindAllPaymentProfsComposer = (): ControllerGeneric => {
	return new Controller(
		new FindAllPaymentProfsUseCase(new PaymentProfMongoRepository()),
	);
};
