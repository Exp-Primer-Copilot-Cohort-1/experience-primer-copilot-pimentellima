import { describe, expect, it } from 'vitest';
import { OptsQuery } from './opts-query';

describe('OptsQuery (Unit)', () => {
	it('should build an OptsQuery object with default values', () => {
		const optsQuery = OptsQuery.build();

		expect(optsQuery.sort).toBe('--created_at');
		expect(optsQuery.limit).toBe(20);
		expect(optsQuery.skip).toBe(0);
		expect(optsQuery.active).toBe(true);
	});

	it('should build an OptsQuery object with custom values', () => {
		const opts = {
			sort: '-createdAt',
			limit: 50,
			skip: 10,
			active: false,
		};

		const optsQuery = OptsQuery.build(opts);

		expect(optsQuery.sort).toBe(opts.sort);
		expect(optsQuery.limit).toBe(opts.limit);
		expect(optsQuery.skip).toBe(opts.skip);
		expect(optsQuery.active).toBe(opts.active);
	});

	it('should handle strings for the active parameter', () => {
		const opts1 = {
			active: 'true',
		};

		const optsQuery1 = OptsQuery.build(opts1);

		expect(optsQuery1.active).toBe(true);

		const opts2 = {
			active: 'false',
		};

		const optsQuery2 = OptsQuery.build(opts2);

		expect(optsQuery2.active).toBe(false);
	});
});
