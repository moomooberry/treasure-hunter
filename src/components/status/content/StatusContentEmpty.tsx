import { FC } from "react";

import EmptyIcon from "@src/components/icons/EmptyIcon";

import StatusContentContainer, {
  StatusContentContainerProps,
} from "./_components/StatusContentContainer";

const StatusContentEmpty: FC<StatusContentContainerProps> = ({ text }) => (
  <StatusContentContainer text={text}>
    <EmptyIcon width="40px" height="40px" color="#636e72" />
  </StatusContentContainer>
);

export default StatusContentEmpty;
