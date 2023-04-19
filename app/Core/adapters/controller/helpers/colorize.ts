import cli from 'cli-color';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

export const colorize = (statusCode: number, url: string, method: Method) => {
	if (!statusCode) {
		return `${cli.cyan(`[${method}]`)} ${url} - ${cli.white(
			'No status code',
		)}`;
	}

	// Green
	if (statusCode >= 200 && statusCode < 300) {
		return `${cli.cyan(`[${method}]`)} ${url} - ${cli.green(statusCode)}`;
	}
	// Yellow
	if (statusCode >= 300 && statusCode < 400) {
		return `${cli.cyan(`[${method}]`)} ${url} - ${cli.yellow(statusCode)}`;
	}

	// Red
	if (statusCode >= 400 && statusCode < 500) {
		return `${cli.cyan(`[${method}]`)} ${url} - ${cli.red(statusCode)}`;
	}

	// Magenta
	if (statusCode >= 500 && statusCode < 600) {
		return `${cli.cyan(`[${method}]`)} ${url} - ${cli.magenta(
			statusCode,
		)} `;
	}

	return `${cli.cyan(`[${method}]`)} ${url} - ${cli.white(statusCode)}`;
};
