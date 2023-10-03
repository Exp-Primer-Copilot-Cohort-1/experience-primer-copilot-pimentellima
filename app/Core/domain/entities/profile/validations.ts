import { z } from 'zod';

const validation = () => z.object({
	_id: z.string(),
	unity_id: z.string(),
	name: z.string().min(3).max(255),
	celphone: z.string(),
	email: z.string().email().max(255),
})

export const validateUnity = () => z.object({
	_id: z.string().nullable().optional(),
	name: z.string().optional(),
	is_company: z.boolean().optional(),
	street: z.string().optional(),
	address_number: z.string().optional(),
	avatar: z.string().optional(),
	cep: z.string().optional(),
	city: z.string().optional(),
	cnaes: z.string().optional(),
	complement: z.string().optional(),
	country: z.string().optional(),
	neighborhood: z.string().optional(),
	obs: z.string().optional(),
	phones: z.array(z.object({ value: z.string(), id: z.number() })).optional(),
	site: z.string().optional(),
	state: z.string().optional(),
})

export default validation