import Hash from '@ioc:Adonis/Core/Hash';
import Mongoose, { Schema } from '@ioc:Mongoose';
import type { IUser } from 'Types/IUser';

const UserSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		celphone: {
			type: String,
			required: true,
		},
		document: {
			type: String,
			required: true,
		},
		unity_id: {
			type: Mongoose.Schema.Types.ObjectId,
			ref: 'unities',
		},
		type: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			required: true,
		},
		avatar: {
			type: String,
			required: false,
		},
		due_date: {
			type: String,
			required: false,
		},
		created_at: {
			type: Date,
			default: Date.now,
		},
		updated_at: {
			type: Date,
			default: Date.now,
		},
		schedule_obs: {
			type: String,
			required: false,
		},
		show_lack: {
			type: Boolean,
			required: false,
		},
		exib_minutes: {
			type: Number,
			required: false,
		},
		is_friday: {
			type: Boolean,
			required: false,
		},
		is_saturday: {
			type: Boolean,
			required: false,
		},
		is_sunday: {
			type: Boolean,
			required: false,
		},
		is_monday: {
			type: Boolean,
			required: false,
		},
		is_tuesday: {
			type: Boolean,
			required: false,
		},
		is_wednesday: {
			type: Boolean,
			required: false,
		},
		is_thursday: {
			type: Boolean,
			required: false,
		},
		hour_end: {
			type: String,
			required: false,
		},
		hour_start: {
			type: String,
			required: false,
		},
		hour_end_lunch: {
			type: String,
			required: false,
		},
		hour_start_lunch: {
			type: String,
			required: false,
		},
		lunch_time_active: {
			type: Boolean,
			required: false,
		},
		rememberMeToken: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	},
);

UserSchema.pre('save', async function (next) {
	const user = this;
	user.password = await Hash.make(user?.password);
	next();
});

export default Mongoose.model<IUser>('users', UserSchema);
