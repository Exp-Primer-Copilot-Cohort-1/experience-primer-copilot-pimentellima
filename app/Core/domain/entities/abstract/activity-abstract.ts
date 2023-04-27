import { AppointmentStatus, STATUS } from "App/Helpers";
import { Entity } from "./entity.abstract";
import { IProcedure } from "Types/IProcedure";
import { IClient } from "Types/IClient";
import { IProf } from "Types/IProf";

export abstract class AbstractActivity extends Entity {
	private _status: AppointmentStatus;
	private _procedures: IProcedure[];
	private _client: IClient;
	private _partner: string;
	private _obs?: string;
	private _prof: IProf;
	private _phone?: string;
	private _active: boolean;
	private _unity_id: string;
	private _prof_id: string;

	public get status() {
		return this._status;
	}

	public get procedures() {
		return this._procedures;
	}

	public get client() {
		return this._client;
	}

	public get partner() {
		return this._partner;
	}

	public get obs() {
		return this._obs;
	}

	public get prof() {
		return this._prof;
	}

	public get phone() {
		return this._phone;
	}

	public get active() {
		return this._active;
	}

	public get unity_id() {
		return this._unity_id;
	}

	public get prof_id() {
		return this._prof_id;
	}

	public defineStatus(status: STATUS): this {
		this._status = status;
		return this;
	}

	public defineProcedures(procedures: IProcedure[]): this {
		this._procedures = procedures;
		return this;
	}

	public defineClient(client: IClient): this {
		this._client = client;
		return this;
	}

	public definePartner(partner: string): this {
		this._partner = partner;
		return this;
	}

	public defineObs(obs?: string): this {
		this._obs = obs;
		return this;
	}

	public defineProf(prof: IProf): this {
		this._prof = prof;
		return this;
	}

	public definePhone(phone?: string): this {
		this._phone = phone;
		return this;
	}

	public defineActive(active: boolean): this {
		this._active = active;
		return this;
	}

	public defineUnityId(unity_id: string): this {
		this._unity_id = unity_id;
		return this;
	}

	public defineProfId(prof_id: string): this {
		this._prof_id = prof_id;
		return this;
	}
}

