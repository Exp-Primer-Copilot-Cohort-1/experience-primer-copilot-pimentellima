import {
	BillingMongooseRepository,
	HolidaysMongoRepository,
	HolidaysNationalsMongoRepository,
	ProfsMongooseRepository,
} from 'App/Core/domain/repositories'
import mongoose from 'mongoose'
import { beforeAll, describe, expect, it } from 'vitest'

import {
	FindAllHolidaysByUnityUseCase,
	SaveHolidaysNationalsDefaultUseCase,
} from '../holidays'
import { AveragePriceProceduresUseCase } from '../procedures/average-price-procedures-group-by-prof'
import { DayTradesByProfUseCase } from './day-trades-by-prof'
import { MinimumDesirableUseCase } from './minimun-expected-use-case'
import { UpdateAttrBillingInMonthUseCase } from './update-attr-revenue-reports-in-month-use-case'

const updateAttrSut = () => {
	const updateAttr = new UpdateAttrBillingInMonthUseCase(
		new BillingMongooseRepository(),
		'expected',
	)

	return {
		updateAttr,
	}
}

const averageSut = () => {
	const average = new AveragePriceProceduresUseCase()
	return {
		average,
	}
}

const dayTradeSut = () => {
	const repo = new ProfsMongooseRepository()
	const repoHoliday = new HolidaysMongoRepository()
	const repoHolidayNationals = new HolidaysNationalsMongoRepository()
	const nationalsHolidayUseCase = new SaveHolidaysNationalsDefaultUseCase(
		repoHolidayNationals,
	)
	const holidayUseCase = new FindAllHolidaysByUnityUseCase(
		repoHoliday,
		nationalsHolidayUseCase,
	)
	const dayTrade = new DayTradesByProfUseCase(repo, holidayUseCase)

	return {
		dayTrade,
	}
}

const makeSut = () => {
	const { updateAttr } = updateAttrSut()
	const { average } = averageSut()
	const { dayTrade } = dayTradeSut()
	const sut = new MinimumDesirableUseCase(average, dayTrade, updateAttr)
	return {
		sut,
	}
}

describe('Minimum Expected Report Use Case (Integration)', () => {
	beforeAll(async () => {
		await mongoose.connect(
			'mongodb://admin:admin@localhost/admin?connectTimeoutMS=300000&retryWrites=true',
		)
	})

	it('should return a report', async () => {
		const { sut } = makeSut()
		const resultOrErr = await sut.execute({ unity_id: '6359660fc109b232759921d4' })
		expect(resultOrErr.isRight()).toBeTruthy()
	})
})
