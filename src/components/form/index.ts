import dynamic from "next/dynamic";

import wrapWithForwardRef from "@src/utils/wrapWithForwardRef";

import { FormInputTextProps } from "./input/FormInputText";
import { FormInputTextareaProps } from "./input/FormInputTextarea";

const FormInputText = wrapWithForwardRef<HTMLInputElement, FormInputTextProps>(
  dynamic(() => import("./input/FormInputText"))
);

const FormInputTextarea = wrapWithForwardRef<
  HTMLTextAreaElement,
  FormInputTextareaProps
>(dynamic(() => import("./input/FormInputTextarea")));

const FormInputImageEditor = dynamic(
  () => import("./input/FormInputImageEditor")
);

const FormTextLabel = dynamic(() => import("./text/FormTextLabel"));

const FormTextNotice = dynamic(() => import("./text/FormTextNotice"));

const FormTextError = dynamic(() => import("./text/FormTextError"));

const Form = {
  Input: {
    Text: FormInputText,
    Textarea: FormInputTextarea,
    ImageEditor: FormInputImageEditor,
  },
  Text: {
    Label: FormTextLabel,
    Notice: FormTextNotice,
    Error: FormTextError,
  },
};

export default Form;
