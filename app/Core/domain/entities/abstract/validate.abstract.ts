export abstract class Validate<T> {
	readonly value: T
	public abstract validate(value, ...args: any): this

	constructor(value: T) {
		this.value = value
	}

}
