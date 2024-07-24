import { FC } from "react";

import ExclamationIcon from "@src/components/icons/ExclamationIcon";

import STYLE from "./form.text.notice.module.scss";

interface FormTextNoticeProps {
  color?: string;
  m?: string;
  text?: string;
}

const FormTextNotice: FC<FormTextNoticeProps> = ({
  text,
  color = "#636e72",
  m = "0px",
}) => (
  <div className={STYLE.__form_text_wrapper} style={{ margin: m, color }}>
    <div className={STYLE.__form_icon_wrapper}>
      <ExclamationIcon width="12px" height="12px" color={color} />
    </div>
    <span className={STYLE.__form_text}>{text}</span>
  </div>
);

export default FormTextNotice;
