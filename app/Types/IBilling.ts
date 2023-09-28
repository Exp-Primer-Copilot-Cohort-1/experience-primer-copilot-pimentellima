export interface IBilling {
	current: number[]
	desirable: number[]
	expected: number[]
}

export type MapBilling = Map<string, IBilling>