const procedures = [
	{
		_id: '5dbff32e367a343830cd2f49',
		name: 'Earth',
		__v: 0,
	},
	{
		_id: '5dbff89209dee20b18091ec3',
		name: 'Mars',
		__v: 0,
	},
];

export class Model {
	constructor() { }

	static find() {
		return this;
	}

	static sort() {
		return this;
	}

	static exec(): Promise<any[]> {
		return Promise.resolve(procedures);
	}
	// ...
}
