import Drive from '@ioc:Adonis/Core/Drive'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { bucket } from '../../../gcs'
import crypto from 'crypto'

const path = require('path')

function generateHashedFileName() {
	const randomValue = Math.random().toString(36).substring(2, 15)
	const hash = crypto.createHash('sha256').update(randomValue).digest('hex')
	return hash
}

class FileController {
	async createClientPicture({ request, response, auth }: HttpContextContract) {
		const { user } = auth
		if (!user) return response.status(401).send({ error: 'User not found' })

		try {
			const promises: Promise<string>[] = []
			request.multipart.onFile('files', {}, async (file) => {
				const promise = new Promise<string>((resolve, reject) => {
					const fileName = generateHashedFileName()
					const filePath = user._id + '/' + fileName
					const publicUrl = `http://storage.googleapis.com/${bucket.name}/${filePath}`

					const bucketFile = bucket.file(filePath)

					file.pipe(
						bucketFile.createWriteStream({
							metadata: { contentType: file.headers['content-type'] },
						}),
					)
						.on('finish', async () => {
							resolve(publicUrl)
						})
						.on('error', (err) => {
							reject(err)
						})
				})
				promises.push(promise)
			})

			await request.multipart.process()
			const fileNames = await Promise.all(promises)
			return fileNames
		} catch (err) {
			return err
		}
	}

	// 	async downloadClientPictures({ request, response, auth }: HttpContextContract) {}

	async uploadProfilePicture({ request, response, auth }: HttpContextContract) {
		try {
			const { user } = auth
			if (!user) return response.status(401).send({ error: 'User not found' })

			const fileNamePromise = new Promise<string>((resolve, reject) => {
				request.multipart.onFile('file', {}, async (file) => {
					const fileName = generateHashedFileName()
					const publicUrl = `http://storage.googleapis.com/${bucket.name}/${fileName}`

					const bucketFile = bucket.file(fileName)

					file.pipe(
						bucketFile.createWriteStream({
							metadata: { contentType: file.headers['content-type'] },
						}),
					).on('finish', async () => {
						if (user.avatar) {
							const oldFilename = user.avatar.split('/').pop()
							if (!oldFilename) return
							const oldBucketFile = bucket.file(oldFilename)
							const isExist = await oldBucketFile.exists()
							if (isExist) {
								await oldBucketFile.delete()
							}
						}

						resolve(publicUrl)
					})
				})
			})

			await request.multipart.process()
			const fileName = await fileNamePromise
			return fileName
		} catch (error) {
			return response.status(500).send({ error: 'File upload failed' })
		}
	}

	async downloadClientModel({ request, response }: HttpContextContract) {
		const filePath = 'clientDataModel.csv'
		const isExist = await Drive.exists(filePath)
		if (isExist) {
			return response.download(
				path.join(__dirname, '../../../public/clientDataModel.csv'),
			)
		}
		return 'File does not exist'
	}
}

export default FileController
