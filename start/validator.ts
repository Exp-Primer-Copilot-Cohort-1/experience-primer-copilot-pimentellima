import { validator } from '@ioc:Adonis/Core/Validator';

import { cnpj, cpf } from 'cpf-cnpj-validator';

import Mongoose from '@ioc:Mongoose';
import { InvalidDocumentException } from 'App/Exceptions';

type UniqueProps = {
	[0]: {
		table: string;
		column: string;
	};
};

validator.rule('unique', async (value, props: UniqueProps) => {
	const { column, table } = props[0];
	const query = { [column]: value };
	const ModelGeneric = Mongoose.model(table);
	const count = await ModelGeneric.where({ ...query }).countDocuments();

	return count === 0;
});

validator.rule(
	'cpfOrCnpjIsValid',
	async (value, _, { errorReporter, pointer }) => {
		if (cpf.isValid(value) || cnpj.isValid(value)) {
			errorReporter.report(pointer, InvalidDocumentException.invoke());
		}
	},
);
