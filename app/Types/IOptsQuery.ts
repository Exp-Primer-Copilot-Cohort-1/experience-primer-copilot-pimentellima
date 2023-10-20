import { ROLES } from "App/Roles/types";

export interface IOptsQuery {
	sort: string;
	limit: number;
	skip: number;
	active: boolean;
	prof?: string;
	role: ROLES;
	unity_id: string;
}
