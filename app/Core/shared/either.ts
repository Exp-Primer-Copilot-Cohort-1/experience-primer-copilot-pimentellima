export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
	private readonly value: L;

	constructor(value: L) {
		this.value = value;
	}

	public isLeft(): this is Left<L, A> {
		return true;
	}

	public isRight(): this is Right<L, A> {
		return false;
	}

	public extract(): L {
		throw this.value;
	}
}

export class Right<L, A> {
	private readonly value: A;

	constructor(value: A) {
		this.value = value;
	}

	public isLeft(): this is Left<L, A> {
		return false;
	}

	public isRight(): this is Right<L, A> {
		return true;
	}

	public extract(): A {
		return this.value;
	}
}

export const left = <L, A>(l: L): Either<L, A> => {
	return new Left<L, A>(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
	return new Right<L, A>(a);
};

export type PromiseEither<L, A> = Promise<Either<L, A>>;
