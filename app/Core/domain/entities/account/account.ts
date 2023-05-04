/* eslint-disable @typescript-eslint/naming-convention */
import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { PaymentStatus, PaymentType } from "App/Helpers";
import { IAccount } from "Types/IAccount";
import { Entity } from "../abstract/entity.abstract";
import { InvalidParamsError } from "../../errors/invalid-params-error";
import { ObjectId } from "@ioc:Mongoose";

export class AccountEntity extends Entity implements IAccount {
    private _name: string;
    private _value: number;
    private _date: Date;
    private _bank: string;
    private _active: boolean;
    private _unity_id: ObjectId | string;
    private _description?: string;
    private _status: PaymentStatus;
    private _type: PaymentType;
    private _user_id?: ObjectId | string;
    private _transaction_id?: ObjectId | string;

    private constructor() {
		super();
	}

    public get name(): string {
    return this._name;
    }

    public get value(): number {
    return this._value;
    }

    public get date(): Date {
    return this._date;
    }

    public get bank(): string {
    return this._bank;
    }

    public get active(): boolean {
    return this._active;
    }

    public get unity_id(): ObjectId | string {
    return this._unity_id;
    }

    public get description(): string | undefined {
    return this._description;
    }

    public get status(): PaymentStatus {
    return this._status;
    }

    public get type(): PaymentType {
    return this._type;
    }

    public get user_id(): ObjectId | string | undefined {
    return this._user_id;
    }

    public get transaction_id(): ObjectId | string | undefined {
    return this._transaction_id;
    }

    defineName(name: string) : AccountEntity {
      this._name = name;
      return this;
    }
    defineValue(value: number) : AccountEntity {
      this._value = value;
      return this;
    }
    defineDate(date: Date) : AccountEntity {
      this._date = date;
      return this;
    }
    defineBank(bank: string) : AccountEntity {
      this._bank = bank;
      return this;
    }
    defineActive(active: boolean) : AccountEntity {
      this._active = active;
      return this;
    }
    defineUnityId(unity_id: string | ObjectId) : AccountEntity {
      this._unity_id = unity_id;
      return this;
    }
    defineDescription(description?: string) : AccountEntity {
      this._description = description;
      return this;
    }
    defineStatus(status: PaymentStatus) : AccountEntity {
      this._status = status;
      return this;
    }
    defineType(type: PaymentType) : AccountEntity {
      this._type = type;
      return this;
    }
    defineUserId(user_id?: string | ObjectId) : AccountEntity {
      this._user_id = user_id;
      return this;
    }
    defineTransactionId(transaction_id? : string | ObjectId) : AccountEntity {
      this._transaction_id = transaction_id;
      return this;
    }

    public static async build(params: IAccount) : PromiseEither<AbstractError, AccountEntity> {
      try {
          return right(new AccountEntity()
              .defineId(params._id?.toString())
              .defineName(params.name)
              .defineValue(params.value)
              .defineDate(params.date)
              .defineBank(params.bank)
              .defineActive(params.active)
              .defineUnityId(params.unity_id)
              .defineDescription(params.description)
              .defineStatus(params.status)
              .defineType(params.type)
              .defineUserId(params.user_id)
              .defineTransactionId(params.transaction_id)
          )
      }
      catch(err) {
          return left(new InvalidParamsError(err));
      }
    }

}

export default AccountEntity;
