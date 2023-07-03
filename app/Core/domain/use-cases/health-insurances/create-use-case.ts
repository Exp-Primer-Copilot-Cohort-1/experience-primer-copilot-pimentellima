import { HealthInsuranceManagerInterface } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import {
	HealthInsuranceParams,
	IHealthInsurance,
} from "Types/IHealthInsurance";

type Props = HealthInsuranceParams & {
	unity_id: string;
};

export class CreateHealthInsuranceUseCase
	implements UseCase<Props, IHealthInsurance>
{
	constructor(private readonly manager: HealthInsuranceManagerInterface) {}

	public async execute(
		params: Props
	): PromiseEither<AbstractError, IHealthInsurance> {
		const healthInsuranceOrErr = await this.manager.create(
			params.unity_id,
			params
		);

		if (healthInsuranceOrErr.isLeft())
			return left(healthInsuranceOrErr.extract());
		return right(healthInsuranceOrErr.extract());
	}
}
