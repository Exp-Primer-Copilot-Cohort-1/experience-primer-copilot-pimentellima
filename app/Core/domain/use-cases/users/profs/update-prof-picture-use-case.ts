import { ProfsMongooseRepository } from 'App/Core/domain/repositories'
import { ProfsManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { deleteFile, uploadFile } from 'App/Core/infra/gcs'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { HttpContextContract } from 'App/Types/Adonis'
import { IProf } from 'App/Types/IProf'
import generateHash from 'App/utils/generate-hash'
import { inject, injectable, registry } from 'tsyringe'

type In = {
	prof_id: string
	request: HttpContextContract['request']
}

@injectable()
@registry([{ token: UpdateProfPictureUseCase, useClass: UpdateProfPictureUseCase }])
export class UpdateProfPictureUseCase implements UseCase<In, IProf> {
	constructor(
		@inject(ProfsMongooseRepository) private readonly manager: ProfsManagerContract,
	) {}

	public async execute({ prof_id, request }: In): PromiseEither<AbstractError, IProf> {
		const profOrErr = await this.manager.findById(prof_id)
		if (profOrErr.isLeft()) return left(profOrErr.extract())
		const { avatar } = profOrErr.extract()
		const oldFilename = avatar?.split('/').pop()

		try {
			let pictureUrl = ''
			request.multipart.onFile('file', {}, async (file) => {
				pictureUrl = await uploadFile(file, generateHash())
				if (oldFilename) {
					await deleteFile(oldFilename).catch((error) => console.log(error))
				}
			})

			await request.multipart.process()
			return await this.manager.updateProfilePicture(prof_id, pictureUrl)
		} catch (err) {
			console.log(err)
			return left(new AbstractError('', 500))
		}
	}
}
