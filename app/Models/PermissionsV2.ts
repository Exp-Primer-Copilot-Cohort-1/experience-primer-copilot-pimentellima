import { model, Schema } from '@ioc:Mongoose'

const PermissionsV2Schema = new Schema({}, { timestamps: true })

export default model('permissions-v2', PermissionsV2Schema)
