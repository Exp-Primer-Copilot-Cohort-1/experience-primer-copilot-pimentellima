// CREATE_UNITY_RULES.ts
import { rules, schema } from '@ioc:Adonis/Core/Validator';

export const CREATE_UNITY_RULES = schema.create({
    email: schema.string({}, [
        rules.required(),
        rules.email(),
        rules.unique({ column: 'email', table: 'unities' })
    ]),
    name: schema.string({}, [
        rules.required(),
        rules.minLength(3)
    ]),
    document: schema.string({}, [
        rules.required(),
        rules.unique({ column: 'document', table: 'unities' }),
        rules.cpfIsCnpjIsValid()
    ])
});