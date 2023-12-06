import crypto from 'crypto'

export default function generateHash() {
	const randomValue = Math.random().toString(36).substring(2, 15)
	const hash = crypto.createHash('sha256').update(randomValue).digest('hex')
	return hash
}
