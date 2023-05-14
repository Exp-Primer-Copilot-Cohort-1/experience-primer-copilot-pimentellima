export type IProcedureEnt = {
	value: number;
	_id: string;
	color: string;
	name: string;
	active: boolean;
	minutes: number;
	partner_id: string;
	products: string[];
	health_insurance: {
		value: string;
		label: string;
		price: string;
	}[];
};
class ProcedureEnt implements IProcedureEnt {
	public _id: string;
	public active: boolean;
	public value: number;
	public color: string;
	public name: string;
	public minutes: number;
	public partner_id: string;
	public products: string[];
	public health_insurance: {
		value: string;
		label: string;
		price: string;
	}[];
	private constructor() { }
	public defineId(id: string): this {
		this._id = id;
		return this;
	}
	public defineActive(active: boolean): this {
		this.active = active;
		return this;
	}
	public defineValue(value: number): this {
		this.value = value;
		return this;
	}

	public defineColor(color: string): this {
		this.color = color;
		return this;
	}

	public defineName(name: string): this {
		this.name = name;
		return this;
	}

	public defineMinutes(minutes: number): this {
		this.minutes = minutes;
		return this;
	}

	public definePartnerId(partner_id: string): this {
		this.partner_id = partner_id;
		return this;
	}

	public defineProducts(products: string[]): this {
		this.products = products;
		return this;
	}

	public defineHealthInsurance(
		health_insurance: {
			value: string;
			label: string;
			price: string;
		}[],
	): this {
		this.health_insurance = health_insurance;
		return this;
	}
	public static build(procedure: IProcedureEnt): ProcedureEnt {
		return new ProcedureEnt()
			.defineId(procedure.id.toString())
			.defineName(procedure.name)
			.defineActive(procedure.active)
			.defineValue(procedure.value)
			.defineColor(procedure.color)
			.definePartnerId(procedure.partner_id)
			.defineProducts(procedure.products)
			.defineHealthInsurance(procedure.health_insurance)
			.defineMinutes(procedure.minutes);
	}
}
export default ProcedureEnt;
