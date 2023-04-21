import { model, Schema } from '@ioc:Mongoose'
import { IActivity } from 'Types/IActivities'
export enum STATUS {
  AWAITING = 'awaiting',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
  REFUNDED = 'refunded',
}

export enum AppointmentStatus {
  AWAITING = 'awaiting',
  MARKED = 'marked',
  RESCHEDULED = 'rescheduled',
  CANCELED = 'canceled',
  COMPLETED = 'completed'
}

export enum PaymentType {
  CREDIT_CARD = 'credit_card',
  BANK_SLIP = 'bank_slip',
  BANK_TRANSFER = 'bank_transfer',
  OTHER = 'other',
}

const ActivitySchema = new Schema<IActivity>({
  date: {
    type: Date,
    required: true,
  },
  hour_start: {
    type: Date,
    required: true,
  },
  hour_end: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(STATUS),
    default: STATUS.AWAITING,
  },
  schedule_block: {
    type: Boolean,
    required: true,
    default: false,
  },
  procedures: [
    {
      value: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      minutes: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      val: {
        type: Number,
        required: true,
      },
      health_insurance: {
        value: {
          type: String,
          required: false,
        },
        label: {
          type: String,
          required: false,
        },
        price: {
          type: Number,
          required: false,
        },
      },
      status: {
        type: String,
        required: true,
        enum: Object.values(PaymentStatus),
        default: PaymentStatus.PENDING,
      },
    },
  ],
  client: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    celphone: {
      type: String,
      required: false,
      default: null,
    },
    email: {
      type: String,
      required: false,
      default: null,
    },
    partner: {
      type: String,
      required: false,
      default: null,
    },
  },
  obs: {
    type: String,
    required: false,
    default: null,
  },
  prof: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  phone: {
    type: String,
    required: false,
    default: null,
  },
  all_day: {
    type: Boolean,
    required: true,
    default: false,
  },
  is_recorrent: {
    type: Boolean,
    required: true,
    default: false,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  unity_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  scheduled: {
    type: String,
    required: true,
    enum: Object.values(AppointmentStatus),
    default: AppointmentStatus.AWAITING,
  },
  prof_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
}, { timestamps: true })

export default model<IActivity>('activities', ActivitySchema)
