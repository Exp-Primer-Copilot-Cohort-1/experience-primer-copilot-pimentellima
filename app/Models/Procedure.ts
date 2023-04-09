import { model, Schema } from '@ioc:Mongoose';
import { IProcedure } from 'Types/IProcedure';

const ProcedureSchema = new Schema<IProcedure>(
    {
      active: {
        type: Boolean,
        required: true,
        default: true,
      },
      value: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      minutes: {
        type: Number,
        required: true,
      },
      prof: [
        {
          value: {
            type: Schema.Types.ObjectId,
            required: true,
          },
          label: {
            type: String,
            required: true,
          },
        },
      ],
      health_insurance: [
        {
          value: {
            type: Schema.Types.ObjectId,
            required: true,
          },
          label: {
            type: String,
            required: true,
          },
          price: {
            type: String,
            required: true,
          },
        },
      ],
      unity_id: {
        type: Schema.Types.ObjectId,
        required: true,
      },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
  );
  
  export default model<IProcedure>('procedures', ProcedureSchema);