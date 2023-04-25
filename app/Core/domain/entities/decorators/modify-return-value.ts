// Decorador de função
// Decorador de função
export default function ModifyReturnValue(
	target: any,
	propertyKey: string,
	descriptor: PropertyDescriptor,
): PropertyDescriptor {
	const originalMethod = descriptor.value

	descriptor.value = async function (...args: any[]) {
		const result = await originalMethod.apply(this, args)

		if (result.isRight()) {
			const obj = result.extract()
			if (typeof obj === 'object') {
				for (const key in obj) {
					if (obj.hasOwnProperty(key) && obj[key]) {
						if (obj[key]['value']) {
							obj[key] = obj[key].value
						}
					}
				}
			}
		}

		return result
	}

	return descriptor
}
