import Ncrypt from 'ncrypt-js'

export const encrypt = async (text: string) => {
	const Env = (await import('@ioc:Adonis/Core/Env')).default
	const ncryptInstance = new Ncrypt(Env.get('APP_KEY'))
	return ncryptInstance.encrypt(text)
}

export const decrypt = async (text: string) => {
	const Env = (await import('@ioc:Adonis/Core/Env')).default
	const ncryptInstance = new Ncrypt(Env.get('APP_KEY'))
	return ncryptInstance.decrypt(text)
}
