export default function divideCurrencyByInteger(
	currencyValue: string | number,
	divisor: number,
): number {
	if (typeof currencyValue === 'string') {
		currencyValue = parseFloat(
			currencyValue
				.trim()
				.replace(/[^0-9,]/g, '')
				.replace(',', '.'),
		)
	}

	if (isNaN(currencyValue)) {
		throw new Error(
			'Invalid currency format. Please use the BRL format (e.g., "R$ 100,00").',
		)
	}

	const result = currencyValue / divisor

	return result
}
