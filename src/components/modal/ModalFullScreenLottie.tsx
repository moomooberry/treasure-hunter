import { FC } from "react";

import Lottie, { LottieProps } from "@src/components/lottie/Lottie";

import { ModalFitContainerProps } from "./_components/ModalFitContainer";
import ModalFullScreenContainer from "./_components/ModalFullScreenContainer";

interface ModalFullScreenLottieProps
  extends ModalFitContainerProps,
    LottieProps {
  // maintainTime: number | "INFINITY";
}

const ModalFullScreenLottie: FC<ModalFullScreenLottieProps> = ({
  isOpen,
  onClose,
  backgroundColor = "transparent",

  // maintainTime,

  ...lottieProps
}) => (
  <ModalFullScreenContainer
    isOpen={isOpen}
    onClose={onClose}
    backgroundColor={backgroundColor}
  >
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie {...lottieProps} />
    </div>
  </ModalFullScreenContainer>
);

export default ModalFullScreenLottie;
