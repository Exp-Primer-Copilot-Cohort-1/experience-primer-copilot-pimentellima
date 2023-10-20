import EnvAdonis from '@ioc:Adonis/Core/Env';
import { IEvn } from './infra';

export class Env implements IEvn {

	get isProd(): boolean {
		return EnvAdonis.get('NODE_ENV') === 'production'
	}

	get(key: string): string | undefined {
		return EnvAdonis.get(key)
	}
}