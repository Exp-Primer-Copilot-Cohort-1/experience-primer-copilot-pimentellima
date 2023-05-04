import { Schema, model } from "@ioc:Mongoose";

const MessageSchema = new Schema<any>({
})

export default model<any>('messages', MessageSchema);
