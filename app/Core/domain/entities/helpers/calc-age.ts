import { differenceInYears } from 'date-fns';

// calcular idade
export const calcAge = (date: Date): number => {
	const today = new Date();
	const birthDate = new Date(date);

	return differenceInYears(today, birthDate);
};