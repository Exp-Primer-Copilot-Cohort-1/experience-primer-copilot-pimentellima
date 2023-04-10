import { Schema, model } from "@ioc:Mongoose";

const UserLogSchema = new Schema<any>({
})

export default model<any>('user_logs', UserLogSchema);
