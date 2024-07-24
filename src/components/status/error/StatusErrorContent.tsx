"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

import StatusContentContainer, {
  StatusContentContainerProps,
} from "../_components/StatusContentContainer";

const ErrorIcon = dynamic(() => import("@src/components/icons/ErrorIcon"));

const StatusErrorContent: FC<StatusContentContainerProps> = ({ text }) => (
  <StatusContentContainer text={text}>
    <ErrorIcon width="40px" height="40px" color="#636e72" />
  </StatusContentContainer>
);

export default StatusErrorContent;
