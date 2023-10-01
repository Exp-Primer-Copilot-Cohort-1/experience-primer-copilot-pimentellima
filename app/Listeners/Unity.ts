import type { EventsList } from '@ioc:Adonis/Core/Event';
import Unity from 'App/Models/Unity';

export default class User {
	async onNewUnity(data: EventsList['new:unity']) {
		const { unity, user, session } = data
		await Unity.updateOne({ _id: unity._id }, { $set: { created_by: user._id.toString() } }, {
			...session.options,
		}).orFail()
	}
}
