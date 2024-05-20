import { FC } from "react";
import EmptyIcon from "../icons/EmptyIcon";
import ErrorIcon from "../icons/ErrorIcon";

import STYLE from "./controller.module.scss";

const ControllerErrorContent: FC<{ text: string }> = ({ text }) => (
  <div className={STYLE.__controller_content_container}>
    <div className={STYLE.__controller_content_icon_wrapper}>
      <ErrorIcon width="40px" height="40px" color="#636e72" />
    </div>
    <span
      className={STYLE.__controller_content_text}
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  </div>
);

const ControllerEmptyContent: FC<{ text: string }> = ({ text }) => (
  <div className={STYLE.__controller_content_container}>
    <div className={STYLE.__controller_content_icon_wrapper}>
      <EmptyIcon width="40px" height="40px" color="#636e72" />
    </div>
    <span
      className={STYLE.__controller_content_text}
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  </div>
);

interface ControllerContentComponent {
  Error: typeof ControllerErrorContent;
  Empty: typeof ControllerEmptyContent;
}

const ControllerContent: ControllerContentComponent = () => null;

export default ControllerContent;

ControllerContent.Error = ControllerErrorContent;
ControllerContent.Empty = ControllerEmptyContent;
