import {
	ClientsMongooseRepository,
	ProceduresMongooseRepository,
	ProfsMongooseRepository,
	UnitiesMongooseRepository
} from "App/Core/domain/repositories";
import {
	ClientManagerContract,
	ProceduresManagerContract,
	ProfsManagerContract,
	UnitiesManagerContract
} from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { IActivity } from "App/Types/IActivity";
import { BasicProcedure } from "App/Types/IProcedure";
import { inject, injectable, registry } from 'tsyringe';
import { SendEmailError } from "../../errors/send-email.err";

@injectable()
@registry([{ token: SendNewAppointment, useClass: SendNewAppointment }])
export class SendNewAppointment implements UseCase<IActivity, Message> {

	constructor(
		@inject(ClientsMongooseRepository) private clientsRepository: ClientManagerContract,
		@inject(ProceduresMongooseRepository) private proceduresRepository: ProceduresManagerContract,
		@inject(ProfsMongooseRepository) private profsRepository: ProfsManagerContract,
		@inject(UnitiesMongooseRepository) private unityRepository: UnitiesManagerContract,
	) { }

	async execute({
		client,
		date,
		procedures,
		prof,
		unity_id
	}: IActivity): PromiseEither<AbstractError, Message> {
		const proceduresDataOrError = await Promise.all(
			procedures.map((procedure) => {
				return this.proceduresRepository.findBasic(
					procedure._id as string,
					procedure.health_insurance as string
				)
			})
		)

		const [
			clientDataOrError,
			profDataOrError,
			unityDataOrError,
		] = await Promise.all([
			this.clientsRepository.findById(client.toString()),
			this.profsRepository.findById(prof.toString()),
			this.unityRepository.findById(unity_id?.toString() as string)
		])

		if (
			clientDataOrError.isLeft() ||
			profDataOrError.isLeft() ||
			unityDataOrError.isLeft() ||
			proceduresDataOrError.some((procedure) => procedure.isLeft())
		) {
			console.log(clientDataOrError.extract())
			console.log(profDataOrError.extract())
			console.log(unityDataOrError.extract())
			console.log(
				proceduresDataOrError.map((procedure) => procedure.extract())
			)

			return left(new SendEmailError())
		}


		const clientData = clientDataOrError.extract()
		const profData = profDataOrError.extract()
		const unityData = unityDataOrError.extract()
		const proceduresData = proceduresDataOrError.map((procedure) => procedure.extract() as BasicProcedure)

		console.log({
			name: clientData.name,
			email: clientData.email,
		})

		console.log({
			name: profData.name,
			email: profData.email,
		})

		console.log({
			name: unityData.name,
			email: unityData.email,
		})

		console.log(
			proceduresData.map((procedure) => ({
				name: procedure.name,
				health_insurance: procedure.health_insurance,
			}))
		)

		return right({ message: 'Email enviado com sucesso' })
	}
}