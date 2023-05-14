import { describe, expect, it } from "vitest";
import { AccountInMemoryRepository } from "../../repositories/account/account-in-memory-repository";
import { FindAllAccountUseCase } from "./find-all-accounts-use-case";
import { FindAccountByIdUseCase } from "./find-account-by-id-use-case";

const account = {
    _id: '1',
    name: 'DR. PERFORMANCE IPATINGA',
    value: 0,
    date: '2022-12-07',
    bank: 'SANTANDER',
    active: true,
}

describe("Find all accounts (Unit)", () => {
    it("should find all accounts that matches unity_id", async () => {
        const repo = new AccountInMemoryRepository();
        repo.accounts = [{
            ...account,
            _id: '1',
            unity_id: '1'
        }, 
        {
            ...account,
            _id: '2',
            unity_id: '2',
        }];
        const respOrErr = await new FindAllAccountUseCase(repo).execute({
            unity_id: '1'
        });
        if (respOrErr.isLeft()) throw Error();
        expect(respOrErr.extract()).toHaveLength(1);
    })
})


describe("Find account by id (Unit)", () => {
    it("should find account that matches id", async () => {
        const repo = new AccountInMemoryRepository();
        repo.accounts = [{
            ...account,
            _id: '1',
            unity_id: '1',
            prof_id: '1'
        }, 
        {
            ...account,
            _id: '2',
            unity_id: '2',
            prof_id: '1'
        }];
        const respOrErr = await new FindAccountByIdUseCase(repo).execute({
            id: '1'
        });
        if (respOrErr.isLeft()) throw Error();
        expect(respOrErr.extract()._id).toBe('1');
    })
})
