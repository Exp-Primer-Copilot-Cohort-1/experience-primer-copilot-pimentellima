import { Schema } from '@ioc:Mongoose'
import { IPaymentProf } from 'Types/IPaymentProf'
import { model } from 'mongoose'

const PaymentProfSchema = new Schema<IPaymentProf>({
  value: { type: Number, required: true },
  percent: { type: Number, required: true },
  procedure: {
    label: { type: String, required: true },
    value: { type: Schema.Types.ObjectId, ref: 'Procedure', required: true },
  },
  health_insurance: {
    label: { type: String, required: true },
    value: { type: Schema.Types.ObjectId, ref: 'HealthInsurance', required: true },
  },
  prof: {
    label: { type: String, required: true },
    value: { type: Schema.Types.ObjectId, ref: 'Prof', required: true },
  },
  active: { type: Boolean, default: true },
  unity_id: { type: Schema.Types.ObjectId, ref: 'Unity', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

export default model<IPaymentProf>('payment_profs', PaymentProfSchema)
