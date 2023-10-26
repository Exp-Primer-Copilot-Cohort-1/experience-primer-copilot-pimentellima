import mongoose from 'mongoose'

export const makeObjectId = () => new mongoose.Types.ObjectId().toString()

export const makeMongoObjectId = (id?: string) => new mongoose.Types.ObjectId(id?.toString())