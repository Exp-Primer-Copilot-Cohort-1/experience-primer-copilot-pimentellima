/* eslint-disable @typescript-eslint/naming-convention */
import { ObjectId } from '@ioc:Mongoose'

export interface ICategory {
  _id: ObjectId
  name: string
  prof: {
    value: ObjectId
    label: string
  }
  active: boolean
  unity_id: ObjectId
}
