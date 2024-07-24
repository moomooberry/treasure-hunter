import { FC } from "react";
import classNames from "classnames";

import STYLE from "./form.text.label.module.scss";

interface FormLabelProps {
  text: string;
  isRequired?: boolean;
  m?: string;
}
const FormTextLabel: FC<FormLabelProps> = ({
  text,
  isRequired,
  m = "0 0 12px 0",
}) => (
  <div
    className={classNames({
      [STYLE.__form_label_text]: true,
      [STYLE.__form_label_text_required]: isRequired,
    })}
    style={{
      margin: m,
    }}
  >
    {text}
  </div>
);

export default FormTextLabel;
