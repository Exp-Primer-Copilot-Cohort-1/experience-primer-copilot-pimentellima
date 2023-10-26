import { faker } from "@faker-js/faker";
import { UnitiesManagerContract } from "App/Core/domain/repositories/interface";
import { right } from "App/Core/shared";
import { vi } from 'vitest';

export const UnitiesManagerInMemory: UnitiesManagerContract = {
	findAll: vi.fn(),
	findById: vi.fn().mockImplementation(async (id: string) => right({
		id,
		name: faker.person.fullName(),
		email: faker.internet.email(),
	})),
	create: vi.fn(),
	deleteById: vi.fn(),
	findByName: vi.fn(),
	findOne: vi.fn().mockImplementation(async (id: string) => right({ id })),
	update: vi.fn(),
}