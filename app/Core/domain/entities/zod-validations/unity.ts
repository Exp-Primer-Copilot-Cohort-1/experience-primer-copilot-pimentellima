import { cnpj, cpf } from 'cpf-cnpj-validator'
import { z } from 'zod'

const validateUnity = () => z.object({
	_id: z.string().nullable().optional(),
	name: z.string(),
	is_company: z.boolean().optional(),
	document: z.string().refine((val) => {
		const numbers = val.replace(/\D/g, '')
		return cpf.isValid(numbers) || cnpj.isValid(numbers)
	}),
	date_expiration: z.date().optional(),
	active: z.boolean(),
	email: z.string().email(),
	address: z.string().optional(),
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
	holidays: z.array(z.object({})).optional(),
	created_at: z.date().nullable().optional(),
	updated_at: z.date().nullable().optional(),
})


export default validateUnity