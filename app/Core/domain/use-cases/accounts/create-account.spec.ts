import { describe, expect, it } from 'vitest';
import { AccountInMemoryRepository } from '../../repositories/account/account-in-memory-repository';
import { CreateAccountUseCase } from './create-account-use-case';

const account = {
    name: 'DR. PERFORMANCE IPATINGA',
    value: 0,
    date: '2022-12-07',
    bank: 'SANTANDER',
    active: true,
    unity_id: '63528c11c109b232759921d1',
}

describe('Create activity (Unit)', () => {
	it('should create account', async () => {
        const sut = new CreateAccountUseCase(new AccountInMemoryRepository());
		const respOrErr = await sut.execute(account as any);
        expect(respOrErr.isRight()).toBeTruthy();
	});
});
