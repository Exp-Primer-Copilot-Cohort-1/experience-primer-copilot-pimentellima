import { ClientsMongooseRepository } from 'App/Core/domain/repositories'
import { ClientManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { deleteFile, uploadFile } from 'App/Core/infra/gcs'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { HttpContextContract } from 'App/Types/Adonis'
import { IUserClient } from 'App/Types/IClient'
import generateHash from 'App/utils/generate-hash'
import { inject, injectable, registry } from 'tsyringe'

type In = {
	request: HttpContextContract['request']
	unity_id: string
	client_id: string
}

@injectable()
@registry([{ token: UpdateClientPictureUseCase, useClass: UpdateClientPictureUseCase }])
export class UpdateClientPictureUseCase implements UseCase<In, IUserClient> {
	constructor(
		@inject(ClientsMongooseRepository)
		private readonly manager: ClientManagerContract,
	) {}

	public async execute({
		request,
		client_id,
	}: In): PromiseEither<AbstractError, IUserClient> {
		const clientOrErr = await this.manager.findById(client_id)
		if (clientOrErr.isLeft()) return left(clientOrErr.extract())
		const { avatar } = clientOrErr.extract()
		const oldFilename = avatar?.split('/').pop()

		try {
			let pictureUrl = ''
			request.multipart.onFile('file', {}, async (file) => {
				pictureUrl = await uploadFile(file, generateHash())
				if (oldFilename) {
					deleteFile(oldFilename).catch((error) => console.log(error))
				}
			})

			await request.multipart.process()
			return await this.manager.updateProfilePicture(client_id, pictureUrl)
		} catch (err) {
			console.log(err)
			return left(new AbstractError('', 500))
		}
	}
}
