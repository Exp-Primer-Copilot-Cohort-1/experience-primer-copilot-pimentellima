/* eslint-disable no-underscore-dangle */
// const mongoose = require('mongoose');
const { format, parseISO } = require('date-fns')

class ActivityEntity {
	constructor(activity) {
		this.map = new Map()

		Object.keys(activity).forEach((key) => {
			this.map.set(key, activity[key])
		})

		this.generateDateDefault()

		if (activity.procedures !== undefined) {
			this.map.set(
				'procedures',
				activity.procedures?.map((procedure) => ({
					value: procedure?.value || null,
					label: procedure?.label || null,
					minutes: procedure?.minutes || null,
					color: procedure?.color || null,
					val:
						procedure?.health_insurance_selected?.price ||
						procedure?.val ||
						null,

					health_insurance: {
						value:
							procedure?.health_insurance?.value ||
							procedure?.health_insurance_selected?.value ||
							null,
						label:
							procedure?.health_insurance?.label ||
							procedure?.health_insurance_selected?.label ||
							null,
						price:
							procedure?.health_insurance?.price ||
							procedure?.health_insurance_selected?.price ||
							null,
					},
					status: procedure?.status || null,
				})),
			)
		}
		if (activity.client !== undefined) {
			this.map.set('client', {
				value: activity.client?.value || null,
				label: activity.client?.label || null,
				celphone: activity.client?.celphone || null,
				email: activity.client?.email || null,
				partner: activity?.client?.partner || null,
			})
		}
		if (activity.prof !== undefined) {
			this.map.set('prof', {
				value: activity.prof?.value || null,
				label: activity.prof?.label || null,
			})
		}

		if (activity.health_insurance !== undefined) {
			if (Array.isArray(activity.health_insurance)) {
				this.map.set(
					'health_insurance',
					activity.health_insurance?.map((healthInsurance) => ({
						value: healthInsurance?.value || null,
						label: healthInsurance?.label || null,
						price: healthInsurance?.price || null,
					})),
				)
			} else {
				this.map.set('health_insurance', [
					{
						value: activity.health_insurance?.value || null,
						label: activity.health_insurance?.label || null,
						price: activity.health_insurance?.price || null,
					},
				])
			}
		}

		if (activity.all_day || activity.schedule_block) {
			this.isAllDayOrScheduleBlock(activity)
		}
	}

	generateDateDefault() {
		const dateAc = format(parseISO(this.map.get('date')), 'yyyy-MM-dd')
		const date = new Date(
			dateAc.split('-')[0],
			parseInt(dateAc.split('-')[1], 10) - 1,
			parseInt(dateAc.split('-')[2], 10),
			0,
			0,
		)

		this.map.set('date', date)
	}

	isAllDayOrScheduleBlock() {
		this.map.delete('dates')
		this.map.delete('is_recorrent')
		this.map.delete('is_recorrent_quantity')
		this.map.delete('is_recorrent_now')
		this.map.delete('is_recorrent_quantity_now')
	}

	params() {
		return Object.fromEntries(this.map)
	}
}

module.exports = ActivityEntity
