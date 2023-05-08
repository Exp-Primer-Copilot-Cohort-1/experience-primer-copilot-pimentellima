import { describe, expect, it } from "vitest";
import { UpdateAccountByIdUseCase } from "./update-account-by-id-use-case";
import { AccountInMemoryRepository } from "../../repositories/account/account-in-memory-repository";

const account = {
    _id: '1',
    name: 'DR. PERFORMANCE IPATINGA',
    value: 0,
    date: '2022-12-07',
    bank: 'SANTANDER',
    active: true,
    unity_id: '63528c11c109b232759921d1',
}

describe("Update activity (Unit)", () => {
	it("should update account active attribute", async () => {
        const repo = new AccountInMemoryRepository();
        repo.accounts = [account];
        const respOrErr = await new UpdateAccountByIdUseCase(repo).execute({
            id: '1',
            account: {
                ...account,
                active: false,
            }
        } as any);
        if(respOrErr.isLeft()) throw Error();
        expect(respOrErr.extract().active).toBe(false);
	});
});
