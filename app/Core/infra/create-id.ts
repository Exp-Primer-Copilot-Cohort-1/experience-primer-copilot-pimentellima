import mongoose from 'mongoose'

export const makeObjectId = () => new mongoose.Types.ObjectId().toString()