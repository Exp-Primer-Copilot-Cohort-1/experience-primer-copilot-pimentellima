import { Storage } from '@google-cloud/storage'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const pathJson = join(process.cwd(), 'keys', 'google_service.json')

const createJsonCredentials = () => {
	const path = join(process.cwd(), 'keys', 'google_service.key')

	const key = readFileSync(path, 'utf8')

	const credentials = JSON.parse(Buffer.from(key, 'base64').toString())

	writeFileSync(pathJson, JSON.stringify(credentials, null, 2))

	return credentials
}

const makeCredentials = () => {
	const existsPath = existsSync(pathJson)

	if (!existsPath) return createJsonCredentials()

	const credentials = require(pathJson)
	return credentials
}

const credentials = makeCredentials()

export const storage = new Storage({
	projectId: credentials.project_id,
	credentials: {
		client_email: credentials.client_email,
		private_key: credentials.private_key ? credentials.private_key : '',
	},
})

export const bucket = storage.bucket(process.env.GCS_BUCKET!)

export const baseGCSUrl = `http://storage.googleapis.com/${bucket.name}`

export async function uploadFile(file: any, fileName: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const bucketFile = bucket.file(fileName)
		const publicUrl = `http://storage.googleapis.com/${bucket.name}/${fileName}`

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
}

export async function deleteFile(fileName: string): Promise<any> {
	const bucketFile = bucket.file(fileName)
	return await bucketFile.delete()
}
