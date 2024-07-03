import { FC } from "react";
import classNames from "classnames";

import ExclamationIcon from "@src/components/icons/ExclamationIcon";

import STYLE from "../form.module.scss";

interface FormTextNoticeProps {
  text?: string;
  m?: string;
}

const FormTextNotice: FC<FormTextNoticeProps> = ({ text, m = "0px" }) => (
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

export default FormTextNotice;
