import { describe, expect, it } from "vitest";
import { storage } from './gcs';

describe("GCS (Only)", () => {
	it("should be credentials defined", () => {
		expect(storage).toBeDefined()
	})
});