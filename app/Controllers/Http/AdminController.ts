import Unity from 'App/Models/Unity'
import User from 'App/Models/User'

import { addDays, parseISO } from 'date-fns'

const SELECTS_USER = ['_id', 'email', 'active', 'unity_id', 'name', 'type']
const SELECTS_UNITY = ['_id', 'name', 'active', 'date_expiration']

class AdminController {
  public async activeUser({ params }) {
    const user = await User.where({ _id: params._id }).firstOrFail()

    user.active = true

    await user.save()

    return user
  }

  public async findAllUnities() {
    const unities = await Unity.find()
    return unities
  }

  public async addDateExpiration({ params }) {
    const { unity_id, days } = params

    const unity = await Unity.where({ _id: unity_id }).findOne()

    if (!unity) {
      return { error: 'Unidade não encontrada' }
    }

    const newDateExpiration = parseISO(unity.date_expiration)
    unity.date_expiration = addDays(newDateExpiration, parseInt(days.toString(), 10)).toISOString()

    await unity.save()

    return unity
  }

  public async findAllUsers() {
    const users = await User.select(SELECTS_USER).fetch()
    return users
  }

  public async findAllInatives() {
    const users = await User.where({
      active: false,
    })
      .select(SELECTS_USER)
      .fetch()

    return users
  }

  public async findAllByProfs({ request }) {
    const { type } = request.only(['type'])

    const users = await User.where({
      type: { $regex: new RegExp(`.*${type}.*`) },
    })
      .select(SELECTS_USER)
      .fetch()

    return users
  }

  public async findAllByUnity({ request }) {
    const { unity_id } = request.only(['unity_id'])

    const users = await User.where({
      type: { $regex: new RegExp(`.*${unity_id}.*`) },
    })
      .select(SELECTS_USER)
      .fetch()

    return users
  }
}

export default AdminController
