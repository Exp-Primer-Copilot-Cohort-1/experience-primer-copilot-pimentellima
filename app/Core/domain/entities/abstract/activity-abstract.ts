import { PaymentStatus } from "App/Helpers";

import { Entity } from "./entity.abstract";
import { Client, IAbstractActivity, Procedure, Prof } from "Types/IActivity";

export abstract class AbstractActivity
	extends Entity
	implements IAbstractActivity
{
	private _status: PaymentStatus;
	private _procedures: Procedure[];
	private _client: Client;
	private _obs?: string;
	private _prof: Prof;
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

	public get obs() {
		return this._obs;
	}

	public get prof() {
		return this._prof;
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

	public defineStatus(status: PaymentStatus): this {
		this._status = status;
		return this;
	}

	public defineProcedures(procedures: Procedure[]): this {
		this._procedures = procedures;
		return this;
	}

	public defineClient(client: Client): this {
		this._client = client;
		return this;
	}

	public defineObs(obs?: string): this {
		this._obs = obs;
		return this;
	}

	public defineProf(prof: Prof): this {
		this._prof = prof;
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
