"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

import StatusContentContainer, {
  StatusContentContainerProps,
} from "../_components/StatusContentContainer";

const EmptyIcon = dynamic(() => import("@src/components/icons/EmptyIcon"));

const StatusEmptyContent: FC<StatusContentContainerProps> = ({ text }) => (
  <StatusContentContainer text={text}>
    <EmptyIcon width="40px" height="40px" color="#636e72" />
  </StatusContentContainer>
);

export default StatusEmptyContent;
