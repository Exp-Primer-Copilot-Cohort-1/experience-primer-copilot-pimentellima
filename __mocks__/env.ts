import { faker } from "@faker-js/faker"
import { IEvn } from "App/Core/infra/infra"

export class EnvMock implements IEvn {

	get isProd(): boolean {
		return true
	}

	get(key: string): string | undefined {
		if (key === 'NODE_ENV') {
			return 'production'
		}

		return faker.word.words(1)
	}
}