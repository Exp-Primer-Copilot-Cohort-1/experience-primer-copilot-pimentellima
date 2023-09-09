import Mongoose, { Schema } from '@ioc:Mongoose'
import { IForm } from 'Types/IForm'

const FormSchema = new Schema<IForm>(
	{
		name: { type: String, required: true },
		questions: [
			{
				id: { type: String, required: true },
				element: { type: String, required: true },
				text: { type: String, required: true },
				required: { type: Boolean, required: true },
				canHaveAnswer: { type: Boolean, required: true },
				canHavePageBreakBefore: { type: Boolean, required: true },
				canHaveAlternateForm: { type: Boolean, required: true },
				canHaveDisplayHorizontal: { type: Boolean, required: true },
				canHaveOptionCorrect: { type: Boolean, required: true },
				canHaveOptionValue: { type: Boolean, required: true },
				canPopulateFromApi: { type: Boolean, required: true },
				field_name: { type: String, required: true },
				label: { type: String, required: true },
				dirty: { type: Boolean, required: true },
			},
		],
		category_id: { type: Mongoose.Types.ObjectId, required: true },
		prof: { type: Object, required: true },
		unity_id: { type: Mongoose.Types.ObjectId, required: true },
		active: { type: Boolean, required: true },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
)

FormSchema.index({ unity_id: 1 }, { unique: false })

export default Mongoose.model<IForm>('forms', FormSchema)
