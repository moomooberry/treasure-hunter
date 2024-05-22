import { FC } from "react";
import ExclamationIcon from "../icons/ExclamationIcon";

import STYLE from "./form.module.scss";
import classNames from "classnames";

interface FormTextProps {
  text?: string;
  m?: string;
}

const FormErrorText: FC<FormTextProps> = ({ text, m = "0px" }) => (
  <div className={STYLE.__form_text_wrapper} style={{ margin: m }}>
    <div className={STYLE.__form_icon_wrapper}>
      <ExclamationIcon width="12px" height="12px" color="#d63031" />
    </div>
    <span
      className={classNames({
        [STYLE.__form_text]: true,
        [STYLE.__form_text_error]: true,
      })}
    >
      {text}
    </span>
  </div>
);

const FormNoticeText: FC<FormTextProps> = ({ text, m = "0px" }) => (
  <div className={STYLE.__form_text_wrapper} style={{ margin: m }}>
    <div className={STYLE.__form_icon_wrapper}>
      <ExclamationIcon width="12px" height="12px" color="#636e72" />
    </div>
    <span
      className={classNames({
        [STYLE.__form_text]: true,
        [STYLE.__form_text_notice]: true,
      })}
    >
      {text}
    </span>
  </div>
);

interface FormTextComponent extends FormTextProps {
  Notice: typeof FormNoticeText;
  Error: typeof FormErrorText;
}

const FormText: FormTextComponent = () => null;

export default FormText;

FormText.Error = FormErrorText;
FormText.Notice = FormNoticeText;
