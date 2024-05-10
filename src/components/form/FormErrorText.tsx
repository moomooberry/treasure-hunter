import { FC } from "react";

import STYLE from "./form.module.scss";

interface FormErrorTextProps {
  text?: string;
  m?: string;
}

const FormErrorText: FC<FormErrorTextProps> = ({ text, m = "0px" }) => (
  <div
    className={STYLE.__form_error_text}
    style={{
      margin: m,
    }}
  >
    {text}
  </div>
);

export default FormErrorText;
