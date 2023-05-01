import { describe, expect, it } from 'vitest';

import { AbstractError } from 'App/Core/errors/error.interface';
import { left, PromiseEither, right } from 'App/Core/shared';
import { Entity } from '../abstract/entity.abstract';

class TestEntity extends Entity {
	private _name: string = 'Uelinto';
	private _age: number = 12;
	private _email: string = 'fake@gmail.com';
	private _password: string = '123456';
	private _active: boolean = false;

	get name(): string {
		return this._name;
	}

	get age(): number {
		return this._age;
	}

	get email(): string {
		return this._email;
	}

	get password(): string {
		return this._password;
	}

	get active(): boolean {
		return this._active;
	}

	static async build(): PromiseEither<AbstractError, TestEntity> {
		try {
			return right(
				new TestEntity()
					.defineCreatedAt(new Date())
					.defineId('123')
					.defineUpdatedAt(new Date()),
			);
		} catch (error) {
			return left(new AbstractError('Error to create a new entity', 400));
		}
	}
}

describe('Getter Params Entity (Unit)', () => {
	it('should return an object with the params of the entity', async () => {
		const entityOrErr = await TestEntity.build();
		if (entityOrErr.isLeft()) {
			throw entityOrErr.extract();
		}
		const entity = entityOrErr.extract();

		expect(entity.params()).toEqual({
			_id: '123',
			created_at: entity.created_at,
			updated_at: entity.updated_at,
			password: '123456',
			name: 'Uelinto',
			age: 12,
			email: 'fake@gmail.com',
			active: false,
		});
	});
});
