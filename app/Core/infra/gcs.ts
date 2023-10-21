import { Storage } from '@google-cloud/storage';
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const pathJson = join(process.cwd(), 'keys', 'google_service.json')

const createJsonCredentials = () => {
	const path = join(process.cwd(), 'keys', 'google_service.key')

	const key = readFileSync(path, 'utf8')

	const credentials = JSON.parse(
		Buffer.from(key, 'base64').toString(),
	)

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


