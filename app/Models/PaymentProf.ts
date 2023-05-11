import Mongoose, { Schema } from '@ioc:Mongoose'
import { IPaymentProf } from 'Types/IPaymentProf'

/** 
* @swagger
* PaymentProf:
*  type: object
*  properties:
*    value:
*      type: number
*      description: Valor do pagamento.
*      example: 100.00
*    percent:
*      type: number
*      description: Percentual do pagamento.
*      example: 50
*    procedure:
*      type: object
*      description: Informações sobre o procedimento relacionado ao pagamento.
*      properties:
*        label:
*          type: string
*          description: Nome do procedimento.
*          example: Consulta médica
*        value:
*          type: string
*          format: uuid
*          description: ID do procedimento no banco de dados.
*          example: 60eb8e44fae7c628c5e5d5f5
*    health_insurance:
*      type: object
*      description: Informações sobre o convênio médico relacionado ao pagamento.
*      properties:
*        label:
*          type: string
*          description: Nome do convênio.
*          example: Amil
*        value:
*          type: string
*          format: uuid
*          description: ID do convênio no banco de dados.
*          example: 60eb8e44fae7c628c5e5d5f6
*    prof:
*      type: object
*      description: Informações sobre o profissional de saúde relacionado ao pagamento.
*      properties:
*        label:
*          type: string
*          description: Nome do profissional.
*          example: Dr. João Silva
*        value:
*          type: string
*          format: uuid
*          description: ID do profissional no banco de dados.
*          example: 60eb8e44fae7c628c5e5d5f7
*    active:
*      type: boolean
*      description: Indica se o pagamento está ativo ou não.
*      example: true
*    unity_id:
*      type: string
*      format: uuid
*      description: ID da unidade onde o pagamento foi realizado.
*      example: 60eb8e44fae7c628c5e5d5f8
*    created_at:
*      type: string
*      format: date-time
*      description: Data de criação do pagamento.
*      example: '2023-05-10T18:30:00.000Z'
*    updated_at:
*      type: string
*      format: date-time
*      description: Data da última atualização do pagamento.
*      example: '2023-05-10T18:30:00.000Z'
*/
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

export default Mongoose.model<IPaymentProf>('payment_profs', PaymentProfSchema)
