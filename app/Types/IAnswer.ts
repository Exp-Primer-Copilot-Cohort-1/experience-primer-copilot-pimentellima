import { ObjectId } from "@ioc:Mongoose";

interface IQuestionOption {
  value: string;
  text: string;
  key: string;
}

export interface IQuestion {
  id: string | ObjectId;
  element: 'Checkboxes' | 'FileUpload' | 'TextInput' | 'Range';
  text: string;
  required: boolean;
  canHaveAnswer?: boolean;
  canHavePageBreakBefore: boolean;
  canHaveAlternateForm: boolean;
  canHaveDisplayHorizontal: boolean;
  canHaveOptionCorrect: boolean;
  canHaveOptionValue: boolean;
  canPopulateFromApi: boolean;
  field_name: string;
  label: string;
  options?: IQuestionOption[];
  dirty: boolean;
  fileType?: string;
  step?: number;
  default_value?: string;
  min_value?: number;
  max_value?: string;
  min_label?: string;
  max_label?: string;
}

export interface IAnswerOption {
  name: string;
  custom_name: string;
  value: null | string[] | number | string
}

export interface IAnswer {
  _id: string;
  name: string;
  unity_id: string | ObjectId;
  category_id: string | ObjectId;
  client_id: string | ObjectId;
  prof_id: string | ObjectId;
  form_id: string | ObjectId;
  activity_id: string | ObjectId;
  active: boolean;
  questions: IQuestion[];
  answers: IAnswerOption[];
  created_at: Date;
  updated_at: Date;
}