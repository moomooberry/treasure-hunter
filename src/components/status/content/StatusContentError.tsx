import { FC } from "react";

import ErrorIcon from "@src/components/icons/ErrorIcon";

import StatusContentContainer, {
  StatusContentContainerProps,
} from "./_components/StatusContentContainer";

const StatusContentError: FC<StatusContentContainerProps> = ({ text }) => (
  <StatusContentContainer text={text}>
    <ErrorIcon width="40px" height="40px" color="#636e72" />
  </StatusContentContainer>
);

export default StatusContentError;
