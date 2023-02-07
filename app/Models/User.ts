import Mongoose, { Schema } from '@ioc:Mongoose';

class User extends Schema {
}

export default Mongoose.model('User', new User());
