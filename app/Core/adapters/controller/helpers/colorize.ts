import { Methods } from 'App/Types/IHelpers';
import cli from 'cli-color';

export const colorize = (statusCode: number, url: string, method: Methods) => {

	// Green
	if (statusCode >= 200 && statusCode < 300) {
		return `${cli.cyan(`[${method}]`)} ${cli.white(url)} - ${cli.green(statusCode)} `;
	}
	// Yellow
	if (statusCode >= 300 && statusCode < 400) {
		return `${cli.cyan(`[${method}]`)} ${url} - ${cli.yellow(statusCode)} `;
	}

	// Red
	if (statusCode >= 400 && statusCode < 500) {
		return `${cli.cyan(`[${method}]`)} ${url} - ${cli.red(statusCode)} `;
	}

	// Magenta
	if (statusCode >= 500 && statusCode < 600) {
		return `${cli.cyan(`[${method}]`)} ${url} - ${cli.magenta(
			statusCode,
		)}  `;
	}

	return `${cli.cyan(`[${method}]`)} ${url}`;
};
