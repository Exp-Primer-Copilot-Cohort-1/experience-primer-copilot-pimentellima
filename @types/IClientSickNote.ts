export interface IClientSickNote {
	client: {
		label: string;
		value: string;
	};
	sickNote: {
		name: string;
		text: string;
	};
	date: Date;
	unity_id: string;
}
