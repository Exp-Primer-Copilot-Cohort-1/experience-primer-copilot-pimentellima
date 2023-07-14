import { isAfter, isBefore, isEqual } from 'date-fns'

export default function ({
	range1Start,
	range1End,
	range2Start,
	range2End,
}: {
	range1Start: Date
	range1End: Date
	range2Start: Date
	range2End: Date
}) {
	if (isAfter(range1Start, range2End)) {
		return false
	}

	if (isBefore(range1End, range2Start)) {
		return false
	}

	if (isEqual(range1Start, range2Start)) {
		return true
	}

	if (isEqual(range1End, range2End)) {
		return true
	}

	if (isAfter(range1Start, range2Start) && isBefore(range1Start, range2End)) {
		return true
	}

	if (isAfter(range1End, range2Start) && isBefore(range1End, range2End)) {
		return true
	}

	return false
}
