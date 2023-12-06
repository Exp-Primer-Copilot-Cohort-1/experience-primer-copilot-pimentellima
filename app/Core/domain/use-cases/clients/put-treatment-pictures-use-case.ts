import { ClientsMongooseRepository } from 'App/Core/domain/repositories'
import { ClientManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { uploadFile } from 'App/Core/infra/gcs'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { HttpContextContract } from 'App/Types/Adonis'
import { IUserClient } from 'App/Types/IClient'
import crypto from 'crypto'
import { inject, injectable, registry } from 'tsyringe'

type In = {
	request: HttpContextContract['request']
	unity_id: string
	client_id: string
}

function generateHash() {
	const randomValue = Math.random().toString(36).substring(2, 15)
	const hash = crypto.createHash('sha256').update(randomValue).digest('hex')
	return hash
}

type FormDataValues = {
	descriptions: string[] | string
	date: string
}

@injectable()
@registry([{ token: PutTreatmentPicturesUseCase, useClass: PutTreatmentPicturesUseCase }])
export class PutTreatmentPicturesUseCase implements UseCase<In, IUserClient> {
	constructor(
		@inject(ClientsMongooseRepository)
		private readonly manager: ClientManagerContract,
	) {}

	public async execute({
		request,
		client_id,
	}: In): PromiseEither<AbstractError, IUserClient> {
		try {
			const promises: Promise<string>[] = []
			request.multipart.onFile('files', {}, async (file) => {
				const promise = uploadFile(file, generateHash())
				promises.push(promise)
			})

			await request.multipart.process()

			const imagesUrls = await Promise.all(promises)
			let descriptions: string[] = []

			// valores do FormData só ficam disponíveis depois do request.multipart.process()
			const formDataValues: FormDataValues = request.only(['descriptions', 'date'])
			if (typeof formDataValues.descriptions === 'string') {
				descriptions = [formDataValues.descriptions]
			}
			else {
				descriptions = formDataValues.descriptions
			}
			const descriptionsArr: string[] = new Array(imagesUrls.length).fill('')
			descriptions?.forEach((d, index) => (descriptionsArr[index] = d))

			return await this.manager.pushTreatmentPictures(
				client_id,
				imagesUrls.map((image_url, index) => ({
					description: descriptionsArr[index],
					image_url,
					date: new Date(formDataValues.date),
				})),
			)
		} catch (err) {
			console.log(err)
			return left(new AbstractError('', 500))
		}
	}
}
