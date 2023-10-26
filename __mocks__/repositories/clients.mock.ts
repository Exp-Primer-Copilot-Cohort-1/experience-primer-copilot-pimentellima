import { faker } from "@faker-js/faker";
import { ClientManagerContract } from "App/Core/domain/repositories/interface";
import { right } from "App/Core/shared";
import { vi } from 'vitest';

export const ClientManagerInMemory: ClientManagerContract = {
	getCount: vi.fn().mockImplementation(async () => right({ count: 0 })),
	findAll: vi.fn().mockImplementation(async () => right([])),
	findById: vi.fn().mockImplementation(
		async (id: string) => right({
			id,
			name: faker.person.fullName(),
			email: faker.internet.email(),
		})
	),
	create: vi.fn().mockImplementation(async (id: string) => right({ id })),
	updateById: vi.fn().mockImplementation(async (id: string) => right({ id })),
}