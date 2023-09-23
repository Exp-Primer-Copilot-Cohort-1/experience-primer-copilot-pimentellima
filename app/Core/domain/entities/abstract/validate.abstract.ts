export abstract class Validate {
	readonly value: any
	public abstract validate(value, ...args: any): this

	constructor(value) {
		this.value = value
	}

	toString(): string {
		return this.value
	}
}
