import { faker } from "@faker-js/faker";
import { ProfsManagerContract } from "App/Core/domain/repositories/interface";
import { right } from "App/Core/shared";
import { vi } from 'vitest';

export const ProfManagerInMemory: ProfsManagerContract = {
	getCount: vi.fn(),
	findAll: vi.fn(),
	findById: vi.fn().mockImplementation(async (id: string) => right({
		id,
		name: faker.person.fullName(),
		email: faker.internet.email(),
	})),
}