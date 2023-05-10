import Mongoose, { Schema } from "@ioc:Mongoose";
import { IAnswer } from "Types/IAnswer";

const AnswerSchema = new Schema<IAnswer>({
  name: {
    type: String,
    required: true,
  },
  questions: {
    task_data: [{
      id: {
        type: String,
        required: true,
      },
      element: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      required: {
        type: Boolean,
        required: true,
      },
      canHaveAnswer: {
        type: Boolean,
        required: true,
      },
      canHavePageBreakBefore: {
        type: Boolean,
        required: true,
      },
      canHaveAlternateForm: {
        type: Boolean,
        required: true,
      },
      canHaveDisplayHorizontal: {
        type: Boolean,
        required: true,
      },
      canHaveOptionCorrect: {
        type: Boolean,
        required: true,
      },
      canHaveOptionValue: {
        type: Boolean,
        required: true,
      },
      canPopulateFromApi: {
        type: Boolean,
        required: true,
      },
      field_name: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      options: [{
        value: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        key: {
          type: String,
          required: true,
        },
      }],
      dirty: {
        type: Boolean,
        required: true,
      },
    }],
  },
  category_id: {
    id: {
      type: String,
      required: true,
    },
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
  unity_id: {
    id: {
      type: String,
      required: true,
    },
  },
  active: {
    type: Boolean,
    required: true,
  },
});

export default Mongoose.model<IAnswer>('answers', AnswerSchema);