import { adaptRoute } from 'App/Core/adapters'
import { ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { CreateShareAnswerUseCase } from 'App/Core/domain/use-cases/shared-answers/create-share-answer-use-case'
import SharedAnswer from 'App/Models/SharedAnswer'
import { HttpContextContract } from 'App/Types/Adonis'

const makeCreateShareAnswerComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreateShareAnswerUseCase)
}

class SharedAnswerController {
	async getSharedAnswers(ctx: HttpContextContract) {
		const profId = ctx.auth.user?._id
		const sharedAnswer = await SharedAnswer.find({ shared_by: profId })
			.populate('shared_by', {
				_id: 0,
				name: 1,
				id: '$_id',
			})
			.populate('shared_with', {
				_id: 0,
				name: 1,
				id: '$_id',
			})
			.populate('client', {
				_id: 0,
				name: 1,
				id: '$_id',
			})
		return sharedAnswer
	}

	async createShareAnswer(ctx: HttpContextContract) {
		return adaptRoute(makeCreateShareAnswerComposer(), ctx, {
			shared_by: ctx.auth.user?._id.toString(),
			unity_id: ctx.auth.user?.unity_id.toString(),
		})
	}
}

export default SharedAnswerController
