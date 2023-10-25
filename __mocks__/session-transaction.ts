import { ISessionTransaction } from "App/Core/infra/infra";
import { vi } from 'vitest';

export class SessionTransactionMock implements ISessionTransaction {
	manager?: any;
	options?: any;

	startSession = vi.fn().mockResolvedValue(undefined)

	commitTransaction = vi.fn().mockResolvedValue(undefined)

	abortTransaction = vi.fn().mockResolvedValue(undefined)

	endSession = vi.fn().mockResolvedValue(undefined)

}