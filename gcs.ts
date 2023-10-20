import { Storage } from '@google-cloud/storage'

const credentials = JSON.parse(
	Buffer.from(process.env.GOOGLE_SERVICE_KEY!, 'base64').toString(),
)

export const storage = new Storage({
	projectId: credentials.project_id,
	credentials: {
		client_email: credentials.client_email,
		private_key: credentials.private_key ? credentials.private_key : '',
	},
})

export const bucket = storage.bucket(process.env.GCS_BUCKET!)

export const baseGCSUrl = `http://storage.googleapis.com/${bucket.name}`


