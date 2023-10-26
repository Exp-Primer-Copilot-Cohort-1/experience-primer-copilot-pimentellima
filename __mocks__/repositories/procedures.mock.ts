import { faker } from "@faker-js/faker";
import { ProceduresManagerContract } from "App/Core/domain/repositories/interface";
import { right } from "App/Core/shared";
import { BasicProcedure } from "App/Types/IProcedure";
import { vi } from 'vitest';

export const ProceduresManagerInMemory: ProceduresManagerContract = {
	findAll: vi.fn().mockImplementation(async () => right([]) as any),
	findById: vi.fn().mockImplementation(async (id: string) => right({ id })),
	create: vi.fn().mockImplementation(async (id: string) => right({ id })),
	delete: vi.fn().mockImplementation(async (id: string) => right({ id })),
	update: vi.fn().mockImplementation(async (id: string) => right({ id })),
	findBasic: vi.fn().mockImplementation(async (id: string) => right({
		id,
		color: faker.internet.color(),
		name: faker.lorem.word(),
		price: faker.number.float({ precision: 0.0001 }) * 100,
		health_insurance: faker.lorem.word(),
		minutes: faker.number.int({ min: 15, max: 120 }),
	} as BasicProcedure)),
	findByName: vi.fn(),
}