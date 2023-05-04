export type Getters<T> = {
	[K in keyof T]: T[K] extends (...args: any[]) => any
	? ReturnType<T[K]> extends T[K]
	? never
	: ReturnType<T[K]>
	: never;
};

export type GetterParams<T> = {
	[K in keyof Getters<T>]: Getters<T>[K];
};

export function getGetters(instance: any): any {
	const result: any = {};

	let prototype = Object.getPrototypeOf(instance);

	// Loop pelos protótipos das classes até encontrar o protótipo do Object
	while (prototype !== Object.prototype) {
		const propertyNames = Object.getOwnPropertyNames(prototype);

		propertyNames.forEach((propertyName: string) => {
			const descriptor = Object.getOwnPropertyDescriptor(
				prototype,
				propertyName,
			);

			if (
				descriptor &&
				descriptor.get &&
				!descriptor.set &&
				!result.hasOwnProperty(propertyName)
			) {
				result[propertyName] = descriptor.get.call(instance);
			}
		});

		// Move para o próximo protótipo (classe base)
		prototype = Object.getPrototypeOf(prototype);
	}

	return result;
}
