import { UnitiesMongooseRepository } from 'App/Core/domain/repositories'
import { UnitiesManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { deleteFile, uploadFile } from 'App/Core/infra/gcs'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { HttpContextContract } from 'App/Types/Adonis'
import { IUnity } from 'App/Types/IUnity'
import generateHash from 'App/utils/generate-hash'
import { inject, injectable, registry } from 'tsyringe'

type In = {
	unity_id: string
	request: HttpContextContract['request']
}

@injectable()
@registry([{ token: UpdateUnityPictureUseCase, useClass: UpdateUnityPictureUseCase }])
export class UpdateUnityPictureUseCase implements UseCase<In, IUnity> {
	constructor(
		@inject(UnitiesMongooseRepository) private readonly manager: UnitiesManagerContract,
	) {}

	public async execute({ unity_id, request }: In): PromiseEither<AbstractError, IUnity> {
		const unityOrErr = await this.manager.findById(unity_id)
		if (unityOrErr.isLeft()) return left(unityOrErr.extract())
		const { avatar } = unityOrErr.extract()
		const oldFilename = avatar?.split('/').pop()

		try {
			let pictureUrl = ''
			request.multipart.onFile('file', {}, async (file) => {
				pictureUrl = await uploadFile(file, generateHash())
				if (oldFilename) {
					console.log('------deletando--------')
					deleteFile(oldFilename).catch((error) => console.log(error))
				}
			})

			await request.multipart.process()

			return await this.manager.updateUnityPicture(unity_id, pictureUrl)
		} catch (err) {
			console.log(err)
			return left(new AbstractError('', 500))
		}
	}
}
