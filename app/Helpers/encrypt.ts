import Ncrypt from 'ncrypt-js'

const isTestMode = process.env.NODE_ENV === 'test'

export const encrypt = async (text: string) => {
	try {
		const Env = (await import('@ioc:Adonis/Core/Env')).default
		const ncryptInstance = new Ncrypt(Env.get('APP_KEY'))
		return ncryptInstance.encrypt(text)
	} catch (error) {
		return text
	}
}

export const decrypt = async (text: string) => {
	try {
		const Env = (await import('@ioc:Adonis/Core/Env')).default
		const ncryptInstance = new Ncrypt(Env.get('APP_KEY'))
		return ncryptInstance.decrypt(text)
	} catch (error) {
		return text
	}
}

export const decryptSync = (text: string) => {
	try {
		const Env = require('@ioc:Adonis/Core/Env')
		const ncryptInstance = new Ncrypt(Env.get('APP_KEY'))
		return ncryptInstance.decrypt(text)
	} catch (error) {
		return text
	}
}
