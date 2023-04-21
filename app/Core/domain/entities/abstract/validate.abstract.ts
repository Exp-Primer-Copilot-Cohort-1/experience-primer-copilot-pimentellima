export abstract class Validate {
	private readonly _value: any;
	public abstract validate(value): this;

	constructor(value) {
		this._value = value;
	}

	public get value(): any {
		return this._value;
	}
}
