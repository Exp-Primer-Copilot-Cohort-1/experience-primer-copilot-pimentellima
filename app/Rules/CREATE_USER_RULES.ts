import { rules, schema } from '@ioc:Adonis/Core/Validator';

export const CREATE_USER_RULES = schema.create({
	email: schema.string({}, [
		rules.email(),
		rules.unique({ column: 'email', table: 'users' }),
	]),
	name: schema.string(),
	password: schema.string({}, [
		rules.minLength(6),
		rules.regex(/^(?=.*[A-Z])/),
		rules.regex(/^(?=.*[0-9])/),
		rules.regex(/^(?=.*[!@#$%^&*])/),
	]),
	document: schema.string({}, [
		rules.unique({ column: 'document', table: 'unities' }),
		rules.cpfIsCnpjIsValid(),
	]),
});
