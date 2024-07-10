"use client";

import { FC, MouseEventHandler } from "react";
import Image from "next/image";

import LayoutFooterContainer from "@src/components/layout/footer/_components/LayoutFooterContainer";
import LayoutBodyCommon from "@src/components/layout/body/LayoutBodyCommon";
import LayoutHeaderContainer from "@src/components/layout/header/_components/LayoutHeaderContainer";
import LayoutHeaderRoundButton from "@src/components/layout/header/_components/LayoutHeaderRoundButton";
import CloseIcon from "@src/components/icons/CloseIcon";
import Button from "@src/components/button/Button";
import useZustandDeviceStore from "@src/hooks/zustand/useZustandDeviceStore";
import {
  LAYOUT_FOOTER_HEIGHT,
  LAYOUT_HEADER_HEIGHT,
} from "@src/constants/layout";

import ModalFullScreenContainer, {
  ModalFullScreenContainerProps,
} from "./_components/ModalFullScreenContainer";

import STYLE from "./modal.module.scss";

interface ModalFullScreenPhotoEditorProps
  extends ModalFullScreenContainerProps {
  image: string;
  options?: {
    onDeleteClick: MouseEventHandler<HTMLButtonElement>;
    onEditClick: MouseEventHandler<HTMLButtonElement>;
  };
}

const ModalFullScreenPhotoEditor: FC<ModalFullScreenPhotoEditorProps> = ({
  isOpen,
  onClose,
  backgroundColor,

  image,
  options,
}) => {
  const {
    device: { top, bottom },
  } = useZustandDeviceStore();

  return (
    <ModalFullScreenContainer
      isOpen={isOpen}
      onClose={onClose}
      backgroundColor={backgroundColor}
    >
      <LayoutHeaderContainer backgroundColor="transparent" shadowDisabled>
        <LayoutHeaderRoundButton onClick={onClose}>
          <CloseIcon width="14px" height="14px" />
        </LayoutHeaderRoundButton>
      </LayoutHeaderContainer>

      <LayoutBodyCommon paddingX="0">
        <div
          className={STYLE.__image_wrapper}
          style={{
            height: `calc(100vh - ${top} - ${LAYOUT_HEADER_HEIGHT} - ${bottom} - ${LAYOUT_FOOTER_HEIGHT} - 40px)`,
          }}
        >
          <Image
            src={image}
            alt="treasure_hint_image"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </LayoutBodyCommon>

      {options && (
        <LayoutFooterContainer backgroundColor={backgroundColor}>
          <div className={STYLE.__image_footer_button_wrapper}>
            <Button
              variant="cancel"
              width="calc(50% - 6px)"
              onClick={options.onDeleteClick}
            >
              삭제하기
            </Button>

            <Button
              variant="common"
              width="calc(50% - 6px)"
              onClick={options.onEditClick}
            >
              편집하기
            </Button>
          </div>
        </LayoutFooterContainer>
      )}
    </ModalFullScreenContainer>
  );
};

export default ModalFullScreenPhotoEditor;
