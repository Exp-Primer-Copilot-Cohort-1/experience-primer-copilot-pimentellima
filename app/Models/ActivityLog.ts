import Mongoose, { Schema } from '@ioc:Mongoose';

const ActivityLogSchema = new Schema({});

export default Mongoose.model('activity_logs', ActivityLogSchema);
