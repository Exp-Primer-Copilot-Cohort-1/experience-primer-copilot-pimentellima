import { ObjectId } from '@ioc:Mongoose'

export enum HolidayType {
	Nacional = 'nacional',
	Estadual = 'estadual',
	Municipal = 'municipal',
}

/**
 * Contract que representa um feriado.
 * @interface
 * @swagger
 * components:
 *   schemas:
 *     Holiday:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: O ID do feriado.
 *         date:
 *           type: string
 *           format: date
 *           description: A data do feriado.
 *         name:
 *           type: string
 *           description: O nome do feriado.
 *         type:
 *           type: string
 *           enum: [nacional, estadual, municipal]
 *           description: O tipo do feriado.
 */
export interface IHoliday {
	_id?: ObjectId | string
	date: string
	name: string
	type: HolidayType
}
