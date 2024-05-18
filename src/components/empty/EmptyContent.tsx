import { FC, ReactNode } from "react";
import EmptyIcon from "../icons/EmptyIcon";

import STYLE from "./empty.module.scss";

interface EmptyContentProps {
  icon?: ReactNode;
  text: string;
}

const EmptyContent: FC<EmptyContentProps> = ({ icon, text }) => (
  <div className={STYLE.__empty_content_container}>
    <div className={STYLE.__empty_content_icon_wrapper}>
      {icon ?? <EmptyIcon width="40px" height="40px" color="#636e72" />}
    </div>
    <span
      className={STYLE.__empty_content_text}
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  </div>
);

export default EmptyContent;
