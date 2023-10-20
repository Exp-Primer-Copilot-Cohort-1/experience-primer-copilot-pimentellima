import { vi } from 'vitest'

vi.mock('@ioc:Adonis/Core/Application', async () => {
	return {
		default: {
			namespace: () => { },
			publicPath: (path: string) => path
		},
	}
})

vi.mock('@ioc:Adonis/Core/Env', async () => {
	return {
		default: {
		},
	}
})

vi.mock('@ioc:Adonis/Core/Logger', async () => {
	return {
		default: {
			fatal: () => { },
			emit: () => { },
		},
	}
})

vi.mock('@ioc:Adonis/Addons/Mail', async () => {
	return {
		default: {
			send: () => { },
		},
	}
})