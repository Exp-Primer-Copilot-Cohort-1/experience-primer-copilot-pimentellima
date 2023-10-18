import EnvAdonis from '@ioc:Adonis/Core/Env';

export interface IEvn {
	isProd: boolean
	get: (key: string) => string | undefined
}

export class Env implements IEvn {

	get isProd(): boolean {
		return EnvAdonis.get('NODE_ENV') === 'production'
	}

	get(key: string): string | undefined {
		return EnvAdonis.get(key)
	}
}