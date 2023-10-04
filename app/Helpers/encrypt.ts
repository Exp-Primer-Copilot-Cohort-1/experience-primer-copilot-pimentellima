import Ncrypt from 'ncrypt-js'

const isTestMode = process.env.NODE_ENV === 'test'

export const encrypt = async (text: string) => {
	if (isTestMode) {
		return text
	}

	const Env = (await import('@ioc:Adonis/Core/Env')).default
	const ncryptInstance = new Ncrypt(Env.get('APP_KEY'))
	return ncryptInstance.encrypt(text)
}

export const decrypt = async (text: string) => {
	if (isTestMode) {
		return text
	}

	const Env = (await import('@ioc:Adonis/Core/Env')).default
	const ncryptInstance = new Ncrypt(Env.get('APP_KEY'))
	return ncryptInstance.decrypt(text)
}
