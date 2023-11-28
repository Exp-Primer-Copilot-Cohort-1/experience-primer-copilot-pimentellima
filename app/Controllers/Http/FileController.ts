import Drive from '@ioc:Adonis/Core/Drive'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { baseGCSUrl, bucket } from 'App/Core/infra/gcs'
import Client from 'App/Models/Client'
import { TreatmentPicture } from 'App/Types/IClient'
import crypto from 'crypto'

const path = require('path')

function generateHashedFileName() {
	const randomValue = Math.random().toString(36).substring(2, 15)
	const hash = crypto.createHash('sha256').update(randomValue).digest('hex')
	return hash
}

function generateHash() {
	const randomValue = Math.random().toString(36).substring(2, 15)
	const hash = crypto.createHash('sha256').update(randomValue).digest('hex')
	return hash
}

class FileController {
	async putTreatmentPictures({ request, auth }: HttpContextContract) {
		const clientId = request.params().client_id

		try {
			const promises: Promise<string>[] = []
			request.multipart.onFile('files', {}, async (file) => {
				const promise = new Promise<string>((resolve, reject) => {
					const hash = generateHash()
					const filePath = clientId + '/' + hash
					const publicUrl = baseGCSUrl + '/' + filePath
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

			const imagesUrls = await Promise.all(promises)
			const { descriptions, date }: { descriptions: string[]; date: string } =
				request.only(['descriptions', 'date', 'clientId'])
			const dateObj = new Date(date)
			const descriptionsArr: string[] = new Array(imagesUrls.length).fill('')
			descriptions?.forEach((d, index) => (descriptionsArr[index] = d))
			const treatment_pictures: TreatmentPicture[] = imagesUrls.map(
				(image_url, index) => ({
					description: descriptionsArr[index],
					image_url,
					date: dateObj,
				}),
			)

			const client = await Client.findByIdAndUpdate(
				clientId,
				{
					$push: {
						treatment_pictures: {
							$each: treatment_pictures,
						},
					},
				},
				{
					new: true,
				},
			)
			return client
		} catch (err) {
			console.log(err)
			return err
		}
	}

	async createClientPicture({ request, auth }: HttpContextContract) {
		const { user } = auth

		try {
			const promises: Promise<string>[] = []
			request.multipart.onFile('files', {}, async (file) => {
				const promise = new Promise<string>((resolve, reject) => {
					const fileName = generateHashedFileName()
					const filePath = user?._id + '/' + fileName
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

	async uploadProfilePicture({ request, response, auth }: HttpContextContract) {
		try {
			const { user } = auth

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
						if (user?.avatar) {
							const oldFilename = user?.avatar.split('/').pop()
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

	async downloadClientModel({ response }: HttpContextContract) {
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
