"use client";

import { FC, PropsWithChildren } from "react";

import STYLE from "./status.content.container.module.scss";

export interface StatusContentContainerProps {
  text: string;
}

const StatusContentContainer: FC<
  PropsWithChildren<StatusContentContainerProps>
> = ({ text, children }) => (
  <div className={STYLE.__controller_content_container}>
    <div className={STYLE.__controller_content_icon_wrapper}>{children}</div>
    <span
      className={STYLE.__controller_content_text}
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  </div>
);

export default StatusContentContainer;
