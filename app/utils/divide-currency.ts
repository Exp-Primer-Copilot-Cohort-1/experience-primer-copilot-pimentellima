export default function divideCurrencyByInteger(currencyValue: string, divisor: number) {
	const numericValue = parseFloat(
		currencyValue.replace(/[^0-9,]/g, "").replace(",", ".")
	);

	if (isNaN(numericValue)) {
		throw new Error(
			'Invalid currency format. Please use the BRL format (e.g., "R$ 100,00").'
		);
	}

	const result = numericValue / divisor;

	const formattedResult = result.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).replace('R$', '').trim();

	return formattedResult;
}
