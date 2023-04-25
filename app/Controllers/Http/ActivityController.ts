/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

"use strict";

const mongoose = require("mongoose");
const moment = require("moment");
const { format, parseISO, subYears } = require("date-fns");

const ActivityEntity = require("../activity-entity");

import Activity from "App/Models/Activity";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ActivityLog from "App/Models/ActivityLog";
import User from "App/Models/User";
import PaymentActivity from "App/Models/PaymentActivity";
import ActivityPayMonth from "App/Models/ActivityPayMonth";
import ActivityStock from "App/Models/ActivityStock";
import { adaptRoute } from "App/Core/adapters";
import { makeFindAllActivitiesComposer } from "App/Core/composers/activities/make-find-all-activities-composer";
import { makeUpdateActivityComposer } from "App/Core/composers/activities/make-update-activity-composer";
import { makeFindActivitiesByProfComposer } from "App/Core/composers/activities/make-find-activity-by-prof-composer";

class ActivityController {
	async index(ctx: HttpContextContract) {
		return adaptRoute(makeFindAllActivitiesComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		});
	}

	async findActivitiesByProf(ctx: HttpContextContract) {
		return adaptRoute(makeFindActivitiesByProfComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		});
	}

	async indexByClient({ params }) {
		const activy = await Activity.where({
			"client.value": params.id,
			status: "finished",
		})
			.sort("-date")
			.fetch();

		return activy;
	}

	async store({ request, auth }) {
		const userLogged = auth.user;
		const data = request.only([
			"date",
			"description",
			"hour_start",
			"hour_end",
			"status",
			"schedule_block",
			"schedule",
			"procedures",
			"client",
			"obs",
			"prof",
			"partner",
			"phone",
			"all_day",
			"dates",
			"is_recorrent",
			"is_recorrent_quantity",
			"is_recorrent_now",
			"is_recorrent_quantity_now",
			"health_insurance",
		]);
		try {
			const isRecorrentANDdayMarked =
				data.is_recorrent_now &&
				data.is_recorrent_quantity_now &&
				data.dates &&
				data.dates.length;
			if (isRecorrentANDdayMarked) {
				const activitiesArr = [];
				const userData = await User.where({
					_id: data.prof.value,
				}).first();
				for (const dat of data.dates) {
					const dateAc = format(new Date(dat.date), "yyyy-MM-dd");
					const activityNew = await Activity.create({
						...data,
						date: new Date(
							dateAc.split("-")[0],
							parseInt(dateAc.split("-")[1], 10) - 1,
							parseInt(dateAc.split("-")[2], 10),
							0,
							0
						),
						active: true,
						unity_id: userLogged.unity_id,
						user_id: mongoose.Types.ObjectId(userData._id),
						prof_id: mongoose.Types.ObjectId(data.prof.value),
						scheduled: "scheduled",
					});
					activitiesArr.push(activityNew);
				}
				const activity = activitiesArr[0];

				const actStock = await ActivityStock.where({
					user_id: mongoose.Types.ObjectId(data.prof.value),
				})
					.with("activity")
					.fetch();
				const actStockJSON = actStock.toJSON();
				if (actStockJSON && actStockJSON.length) {
					let activityFinded = null;
					actStockJSON.forEach((act) => {
						if (act.activity.client.value === data.client.value) {
							activityFinded = act;
						}
					});
					if (activityFinded) {
						const acStock = await ActivityStock.where({
							activity_id: mongoose.Types.ObjectId(
								activityFinded.activity_id
							),
						})
							.with("activity")
							.first();

						const QUANTIFICATION_RECORRENT_NOW =
							acStock.quantity_atual -
							data.is_recorrent_quantity -
							data.is_recorrent_quantity_now;

						const quantity =
							QUANTIFICATION_RECORRENT_NOW <= 0 ? 0 : QUANTITY;

						if (quantity <= 0) {
							await acStock.delete();
						} else {
							acStock.merge({
								unity_id: userLogged.unity_id,
								user_id: mongoose.Types.ObjectId(userData._id),
								activity_id: mongoose.Types.ObjectId(
									activityFinded.activity_id
								),
								quantity,
								quantity_total: acStock.quantity_total,
								quantity_atual: quantity,
							});
							await acStock.save();
						}
					} else {
						await ActivityStock.create({
							unity_id: userLogged.unity_id,
							user_id: mongoose.Types.ObjectId(userData._id),
							activity_id: mongoose.Types.ObjectId(
								activitiesArr[0]._id
							),
							quantity:
								data.is_recorrent_quantity -
								data.is_recorrent_quantity_now,
							quantity_atual:
								data.is_recorrent_quantity -
								data.is_recorrent_quantity_now,
							quantity_total: data.is_recorrent_quantity,
						});
					}
				} else {
					await ActivityStock.create({
						unity_id: userLogged.unity_id,
						user_id: mongoose.Types.ObjectId(userData._id),
						activity_id: mongoose.Types.ObjectId(
							activitiesArr[0]._id
						),
						quantity:
							parseInt(data.is_recorrent_quantity, 10) -
							parseInt(data.is_recorrent_quantity_now, 10),
						quantity_atual:
							parseInt(data.is_recorrent_quantity, 10) -
							parseInt(data.is_recorrent_quantity_now, 10),
						quantity_total: data.is_recorrent_quantity,
					});
				}
			}
			const userData = await User.where({ _id: data.prof.value }).first();
			/*  if (userData) {
		try {
		  await Mail.send(
			'emails.activity',
			{
			  date: format(data.date ? new Date(data.date) : new Date(), 'dd/MM/yyyy'),
			},
			(message) => {
			  message.from('ti@dpsystem.com.br');
			  message.to(userData.email);
			  message.subject('Uma nova atividade');
			},
		  );
		} catch (error) {
		  console.log('linha 212');
		}
	  } */
			if (data.is_recorrent && !data.is_recorrent_now) {
				const dateAc = format(parseISO(data.date), "yyyy-MM-dd");
				data.date = new Date(
					dateAc.split("-")[0],
					parseInt(dateAc.split("-")[1], 10) - 1,
					parseInt(dateAc.split("-")[2], 10),
					0,
					0
				);
				const activity = await Activity.create({
					...data,
					date: subYears(
						new Date(
							dateAc.split("-")[0],
							parseInt(dateAc.split("-")[1], 10) - 1,
							parseInt(dateAc.split("-")[2], 10),
							0,
							0
						),
						20
					),
					active: true,
					unity_id: userLogged.unity_id,
					user_id: mongoose.Types.ObjectId(userData._id),
					scheduled: "not_count",
					// scheduled: 'scheduled',
					prof_id: mongoose.Types.ObjectId(data.prof.value),
				});

				const actStock = await ActivityStock.where({
					user_id: mongoose.Types.ObjectId(data.prof.value),
				})
					.with("activity")
					.fetch();
				const actStockJSON = actStock.toJSON();
				if (actStockJSON && actStockJSON.length) {
					let activityFinded = null;
					actStockJSON.forEach((act) => {
						if (act.activity.client.value === data.client.value) {
							activityFinded = act;
						}
					});
					if (activityFinded) {
						const acStck = await ActivityStock.where({
							activity_id: mongoose.Types.ObjectId(
								activityFinded.activity_id
							),
						}).first();
						const quantity =
							acStck.quantity - 1 <= 0 ? 0 : acStck.quantity - 1;
						if (quantity <= 0) {
							await acStck.delete();
						} else {
							acStck.merge({
								unity_id: userLogged.unity_id,
								user_id: mongoose.Types.ObjectId(userData._id),
								activity_id: mongoose.Types.ObjectId(
									activityFinded.activity_id
								),
								quantity_total: acStck.quantity_total,
								quantity_atual: quantity,
								quantity,
							});
							await acStck.save();
						}
					} else {
						await ActivityStock.create({
							unity_id: userLogged.unity_id,
							user_id: mongoose.Types.ObjectId(userData._id),
							activity_id: mongoose.Types.ObjectId(activity._id),
							quantity_total: data.is_recorrent_quantity,
							quantity_atual: data.is_recorrent_quantity,
							quantity: data.is_recorrent_quantity,
						});
					}
				} else {
					await ActivityStock.create({
						unity_id: userLogged.unity_id,
						user_id: mongoose.Types.ObjectId(userData._id),
						activity_id: mongoose.Types.ObjectId(activity._id),
						quantity_total: data.is_recorrent_quantity,
						quantity_atual: data.is_recorrent_quantity,
						quantity: data.is_recorrent_quantity,
					});
				}

				const obj = {
					title: "Nova atividade",
				};
				await ActivityLog.create({
					...obj,
					activity_id: mongoose.Types.ObjectId(activity._id),
					admin: userLogged.toJSON(),
				});
				return activity;
			}

			const activityEntity = new ActivityEntity(data);
			const activity = await Activity.create({
				...activityEntity.params(),
				active: true,
				unity_id: userLogged.unity_id,
				user_id: mongoose.Types.ObjectId(userData._id),
				scheduled: "scheduled",
				prof_id: mongoose.Types.ObjectId(data.prof.value),
			});

			return activity;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async update(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateActivityComposer(), ctx);
	}

	async updateStatus({ params, request }) {
		const activy = await Activity.where({ _id: params.id }).firstOrFail();
		if (activy) {
			const data = request.only([
				"started_at",
				"finished_at",
				"scheduled",
				"time",
				"status",
			]);
			activy.merge({
				...data,
			});
			await activy.save();
			return activy;
		}
		return false;
	}

	async updateStatusUser({ params, request }) {
		const activy = await Activity.where({ _id: params.id }).firstOrFail();
		if (
			activy &&
			(activy.status === "finished" ||
				activy.status === "canceled" ||
				activy.status === "canceled_client")
		) {
			const data = request.only(["status"]);
			activy.merge({
				...data,
			});
			await activy.save();
			return activy;
		}
		return false;
	}

	async show({ params }) {
		const activy = await Activity.where({ _id: params.id })
			.with("user")
			.firstOrFail();

		return activy;
	}

	async destroy({ params }) {
		const activy = await Activity.where({ _id: params.id }).firstOrFail();
		await activy.delete();
	}

	async payment({ request, auth }) {
		// PaymentActivity
		const userLogged = auth.user;
		const data = request.only([
			"activity_id",
			"client",
			"prof",
			"total",
			"type_payment",
			"months",
			"date_pay",
		]);

		const activityAlter = await Activity.where({
			_id: mongoose.Types.ObjectId(data.activity_id),
		}).first();
		if (
			activityAlter &&
			activityAlter.procedures &&
			activityAlter.procedures.length
		) {
			try {
				const proceduresNew = [];
				for (const proc of activityAlter.procedures) {
					const newProc = {
						...proc,
						status: "PAGO",
					};
					proceduresNew.push(newProc);
				}
				activityAlter.merge({ procedures: proceduresNew });
				await activityAlter.save();
			} catch (er) {
				console.log("linha 631");
			}
		}

		if (data.type_payment === "credit_card" && data.months > 1) {
			const value = data.total / data.months;
			const arrPay = [];
			for (let i = 1; i <= data.months; i++) {
				const obj = {
					activity_id: mongoose.Types.ObjectId(data.activity_id),
					client: data.client,
					value,
					date: moment(data.date_pay).add(i - 1, "M"),
				};
				arrPay.push(obj);
			}
			for (const pay of arrPay) {
				await ActivityPayMonth.create({
					...pay,
					active: true,
					unity_id: userLogged.unity_id,
					user_id: mongoose.Types.ObjectId(userLogged._id),
				});
			}
		} else {
			const obj = {
				activity_id: mongoose.Types.ObjectId(data.activity_id),
				client: data.client,
				value: data.total,
				date: data.date_pay,
			};
			await ActivityPayMonth.create({
				...obj,
				active: true,
				unity_id: userLogged.unity_id,
				user_id: mongoose.Types.ObjectId(userLogged._id),
			});
		}
		await PaymentActivity.create({
			...data,
			active: true,
			date_pay: new Date(data.date_pay),
			activity_id: mongoose.Types.ObjectId(data.activity_id),
			unity_id: userLogged.unity_id,
			user_id: mongoose.Types.ObjectId(userLogged._id),
		});
		return activityAlter;
	}
}

module.exports = ActivityController;
