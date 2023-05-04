import Mongoose, { Schema } from '@ioc:Mongoose';

const ActivityAwaitSchema = new Schema({});

export default Mongoose.model('activity_awaits', ActivityAwaitSchema);
