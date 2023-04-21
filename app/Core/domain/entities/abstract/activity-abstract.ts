import { PaymentStatus, STATUS } from "Types/IHelpers";

export abstract class AbstractActivity {
	_id: string;
	status: STATUS;
	client_id: string;
	procedures: IProcedure [];
	client: IClient;
	partner: string;
	obs: string | null;
	prof: IProf;
	phone: string | null;
	active: boolean;
	unity_id: string;
	prof_id: string;
	created_at: Date;
	updated_at: Date;
}

interface IProf {
    value: string;
    label: string
}

interface IClient {
    value: string;
    label: string;
    celphone: string | null;
    email: string | null;
    partner: string | null;
}

interface IProcedure {
	value: string;
	label: string;
	minutes: number;
	color: string;
	val: number;
	health_insurance?: IHealthInsurance
	status: PaymentStatus;
}

interface IHealthInsurance {
    value: string; label: string; price: number
}
