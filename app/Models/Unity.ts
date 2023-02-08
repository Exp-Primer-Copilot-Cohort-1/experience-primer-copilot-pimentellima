import Mongoose, { InferSchemaType, Schema } from '@ioc:Mongoose'

const UnitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
})

export type IUnity = InferSchemaType<typeof UnitySchema>

export default Mongoose.model('unities', UnitySchema)
