import Env from '@ioc:Adonis/Core/Env'
import Ncrypt from 'ncrypt-js'

export const encrypt = (text: string) => {
	const ncryptInstance = new Ncrypt(Env.get('APP_KEY'))
	return ncryptInstance.encrypt(text)
}

export const decrypt = (text: string) => {
	const ncryptInstance = new Ncrypt(Env.get('APP_KEY'))
	return ncryptInstance.decrypt(text)
}
