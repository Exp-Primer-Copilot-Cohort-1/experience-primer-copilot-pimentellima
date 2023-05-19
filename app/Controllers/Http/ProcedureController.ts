import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { adaptRoute } from 'App/Core/adapters';
import { makeProceduresDeleteByIdComposer } from 'App/Core/composers/procedures/make-procedures-delete-by-id-composer';
import { makeProceduresFindAllComposer } from 'App/Core/composers/procedures/make-procedures-find-all-composer';
import LogProcedure from 'App/Models/LogProcedure';
import Procedure from 'App/Models/Procedure';

const mongoose = require('mongoose');

const _ = require('lodash');

function customIsEquals(first, second) {
	const val = [];
	_.forEach(second, (value, key) => {
		if (first[key] !== value) {
			val.push({ value, key });
		}
	});
	return val;
}

class ProcedureController {
	async index(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id;

		return adaptRoute(makeProceduresFindAllComposer(), ctx, { unity_id });
	}

	async store({ request, auth }) {
		const userLogged = auth.user;
		const data = request.only([
			'active',
			'value',
			'color',
			'name',
			'minutes',
			'partner_id',
			'products',
			'health_insurance_id',
			'prof',
			'prof_resp',
			'health_insurance',
		]);
		const procedures = await Procedure.create({
			...data,
			unity_id: userLogged.unity_id,
			// prof_resp_id: mongoose.Types.ObjectId(data.prof_resp.value),
		});

		const obj = {
			title: 'Novo procedimento',
		};
		await LogProcedure.create({
			...obj,
			procedures_id: mongoose.Types.ObjectId(procedures._id),
			admin: userLogged.toJSON(),
		});

		return procedures;
	}

	async update({ params, request, auth }) {
		const userLogged = auth.user;
		const procedures = await Procedure.where({
			_id: params.id,
		}).firstOrFail();
		const data = request.only([
			'color',
			'name',
			'minutes',
			'partner_id',
			'value',
			'active',
			'products',
			'health_insurance_id',
			'prof',
			'prof_resp',
			'health_insurance',
		]);
		procedures.merge({ ...data, unity_id: userLogged.unity_id });
		await procedures.save();

		const dataArr = customIsEquals(procedures.toJSON(), data);
		for (const dt of dataArr) {
			let title = '';
			if (dt.key === 'active') {
				title = 'Ativo';
			}
			if (dt.key === 'name') {
				title = 'Nome';
			}
			if (dt.key === 'minutes') {
				title = 'Minutos';
			}
			if (dt.key === 'partner_id') {
				title = 'Parceiro';
			}
			if (dt.key === 'value') {
				title = 'Valor';
			}
			if (dt.key === 'color') {
				title = 'Cor';
			}
			if (dt.key === 'products') {
				title = 'Produtos';
			}
			if (dt.key === 'prof_resp') {
				title = 'Profissional responsável';
			}
			if (dt.key === 'health_insurance') {
				title = 'Plano de saúde';
			}
			const obj = {
				title,
			};
			await Logprocedure.create({
				...obj,
				procedures_id: mongoose.Types.ObjectId(procedures._id),
				admin: userLogged.toJSON(),
				prof_resp_id: mongoose.Types.ObjectId(data.prof_resp.value),
			});
		}

		return procedures;
	}

	async destroy(ctx: HttpContextContract) {
		return adaptRoute(makeProceduresDeleteByIdComposer(), ctx);
	}
}

export default ProcedureController;
