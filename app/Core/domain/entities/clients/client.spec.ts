import { faker } from '@faker-js/faker';
import { AbstractError } from 'App/Core/errors/error.interface';
import { describe, expect, it, vi } from 'vitest';
import { BirthDateInvalidError } from '../errors/birth-date-invalid';
import { ClientNotSponsorError } from '../errors/client-not-sponsor';
import { NameInvalidError } from '../errors/name-invalid';
import Document from '../validations/document';
import Email from '../validations/email';
import Sponsor from '../validations/sponsor';
import { ClientEntity } from './client';

const makeSut = () => {
	const doc = {
		name: 'John Doe',
		birth_date: '1990-01-01',
		document: '12345678900',
		celphone: '5551999999999',
		email: faker.internet.email(),
		unity_id: '1',
	}

	const spyDoc = vi.spyOn(Document.prototype, 'validate')
	const spySponsor = vi.spyOn(Sponsor.prototype, 'validate')
	const spyEmail = vi.spyOn(Email.prototype, 'validate')

	return {
		spyDoc,
		spySponsor,
		spyEmail,
		doc
	}
}


describe('Client Entity (Unit)', () => {
	vi.mock('./validations-client', () => ({
		__esModule: true,
		default: vi.fn().mockImplementation(() => {
			return {
				parse: () => {
					return true
				},
			}
		}),
	}));


	it('should create a client', async () => {
		const { doc } = makeSut()
		const clientOrErr = await ClientEntity.build({
			...doc,
			sms_checked: true,
		});

		if (clientOrErr.isLeft()) {
			throw new Error('Client is not valid');
		}

		const client = clientOrErr.extract();

		expect(client.name).toBe('John Doe');
		expect(client.birth_date).toBeInstanceOf(Date);
		expect(client.document).toBe('12345678900');
		expect(client.celphone).toBe('5551999999999');
		expect(client.sms_checked).toBe(true);
	});

	it('should create a client with sponsor', async () => {
		const sponsor = {
			name: 'Jane Doe',
			phone: '5551987654321',
		};
		const { doc } = makeSut()


		const clientOrErr = await ClientEntity.build({
			...doc,
			sponsor,
		});

		if (clientOrErr.isLeft()) {
			throw new Error('Client is not valid');
		}

		const client = clientOrErr.extract();

		expect(client.name).toBe('John Doe');
		expect(client.birth_date).toBeInstanceOf(Date);
		expect(client.document).toBe('12345678900');
		expect(client.celphone).toBe('5551999999999');
		expect(client.sms_checked).toBe(false);
		expect(client.sponsor?.name).toBe('Jane Doe');
		expect(client.sponsor?.phone).toBe('5551987654321');
	});

	it('should throw an error when creating a client without a name', async () => {
		const { doc } = makeSut()
		const clientOrErr = await ClientEntity.build({
			...doc,
			name: '',
		});

		expect(clientOrErr.isLeft()).toBe(true);
		expect((clientOrErr.extract() as AbstractError)).toBeInstanceOf(NameInvalidError);
	});

	it('should throw an error when creating a client with an invalid document', async () => {
		const { doc, spyDoc } = makeSut()
		spyDoc.mockImplementationOnce((doc) => {
			throw new Error('Invalid document')
		})
		const clientOrErr = await ClientEntity.build(doc);

		expect(clientOrErr.isLeft()).toBe(true);
		expect((clientOrErr.extract() as AbstractError).message).toBe('Invalid document');
	});

	it('should calculate the age of the client correctly', async () => {
		const clientOrErr = await ClientEntity.build({
			name: 'John Doe',
			birth_date: '1990-01-01',
			document: '12345678900',
			celphone: '5551999999999',
			sms_checked: true,
			unity_id: '1',
		});

		if (clientOrErr.isLeft()) {
			throw new Error('Client is not valid');
		}

		const client = clientOrErr.extract();

		expect(client.underaged).toBe(false);
	});

	it('should throw an error when creating a client with an invalid sponsor', async () => {
		const { doc, spySponsor } = makeSut()
		spySponsor.mockImplementationOnce(() => {
			throw new Error('Invalid sponsor')
		})
		const clientOrErr = await ClientEntity.build({
			...doc,
			sponsor: {
				name: 'Jane Doe',
				phone: '5551987654321',
			}
		});

		expect(clientOrErr.isLeft()).toBe(true);
		expect((clientOrErr.extract() as AbstractError).message).toBe('Invalid sponsor');
	})

	it('should throw an error when creating a client with an invalid email', async () => {
		const { doc, spyEmail } = makeSut()
		spyEmail.mockImplementationOnce(() => {
			throw new Error('Invalid email')
		})
		const clientOrErr = await ClientEntity.build({
			...doc,
			email: 'invalid-email'
		});

		expect(clientOrErr.isLeft()).toBe(true);
		expect((clientOrErr.extract() as AbstractError).message).toBe('Invalid email');
	})

	it('should throw an error when creating a client with an invalid birth date', async () => {
		const { doc } = makeSut()
		const clientOrErr = await ClientEntity.build({
			...doc,
			birth_date: 'invalid-date'
		});

		expect(clientOrErr.isLeft()).toBe(true);
		expect((clientOrErr.extract() as AbstractError)).toBeInstanceOf(BirthDateInvalidError);
	})

	it('should throw an error when creating a client underaged without a sponsor', async () => {
		const { doc } = makeSut()
		const clientOrErr = await ClientEntity.build({
			...doc,
			birth_date: '2010-01-01'
		});

		expect(clientOrErr.isLeft()).toBe(true);
		expect(clientOrErr.extract()).toBeInstanceOf(ClientNotSponsorError);
	})
});