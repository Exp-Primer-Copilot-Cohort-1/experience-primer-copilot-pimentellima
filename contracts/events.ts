/**
 * Contract source: https://git.io/JfefG
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

declare module '@ioc:Adonis/Core/Event' {
	interface EventsList {
		'new:user': { id: string; email: string, label?: string, name?: string };
		'new:password': { password: string; email: string };
	}
}
