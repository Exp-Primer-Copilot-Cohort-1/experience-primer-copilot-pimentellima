export interface InterfaceError {
	message: string;
	statusCode: number;
	cause?: Error;
}

export abstract class AbstractError extends Error implements InterfaceError {
	constructor(
		message: string,
		public readonly statusCode: number,
		public readonly cause?: Error,
	) {
		super(message);
	}
}
