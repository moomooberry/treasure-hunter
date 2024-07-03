"use client";

import { FC } from "react";

import FormInputImageEditor from "./input/FormInputImageEditor";
import FormInputText from "./input/FormInputText";

import FormTextLabel from "./text/FormTextLabel";
import FormTextNotice from "./text/FormTextNotice";
import FormTextError from "./text/FormTextError";
import FormInputTextarea from "./input/FormInputTextarea";

interface FormComponent extends FC {
  Input: {
    ImageEditor: typeof FormInputImageEditor;
    Text: typeof FormInputText;
    Textarea: typeof FormInputTextarea;
  };
  Text: {
    Label: typeof FormTextLabel;
    Notice: typeof FormTextNotice;
    Error: typeof FormTextError;
  };
}

const Form: FormComponent = () => null;

export default Form;

Form.Input = {} as FormComponent["Input"];
Form.Input.ImageEditor = FormInputImageEditor;
Form.Input.Text = FormInputText;
Form.Input.Textarea = FormInputTextarea;

Form.Text = {} as FormComponent["Text"];
Form.Text.Label = FormTextLabel;
Form.Text.Notice = FormTextNotice;
Form.Text.Error = FormTextError;
