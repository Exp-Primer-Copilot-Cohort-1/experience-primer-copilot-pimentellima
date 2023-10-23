export interface ContractError {
	message: string;
	statusCode: number;
	cause?: Error;
}

export class AbstractError extends Error implements ContractError {
	constructor(
		message: string,
		public readonly statusCode: number,
		public readonly cause?: Error,
	) {
		super(message);
	}
}
