import { ObjectId } from "@ioc:Mongoose";
import { IProf } from "./IProf";

export interface IForm {
    _id: ObjectId | string;
    name: string;
    questions: IQuestion[];
    category_id: ObjectId | string;
    prof: IProf;
    unity_id: ObjectId | string;
    active: boolean;
    created_at: Date | string;
    updated_at: Date | string;
}

export interface IQuestion {
    id: string;
    element: string;
    text: string;
    required: boolean;
    canHaveAnswer: boolean;
    canHavePageBreakBefore: boolean;
    canHaveAlternateForm: boolean;
    canHaveDisplayHorizontal: boolean;
    canHaveOptionCorrect: boolean;
    canHaveOptionValue: boolean;
    canPopulateFromApi: boolean;
    field_name: string;
    label: string;
    dirty: boolean;
}