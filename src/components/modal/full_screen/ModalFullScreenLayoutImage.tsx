"use client";

import { FC, MouseEventHandler } from "react";
import Image from "next/image";

import LayoutHeader from "@src/components/layout/header";
import CloseIcon from "@src/components/icons/CloseIcon";
import LayoutBody from "@src/components/layout/body";
import LayoutFooter from "@src/components/layout/footer";
import Button from "@src/components/button";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import {
  LAYOUT_FOOTER_HEIGHT,
  LAYOUT_HEADER_HEIGHT,
} from "@src/constants/layout";

import ModalFullScreen, { ModalFullScreenProps } from ".";

import STYLE from "./modal.full.screen.module.scss";

interface ModalFullScreenLayoutImageProps extends ModalFullScreenProps {
  image: string;
  options?: {
    onDeleteClick: MouseEventHandler<HTMLButtonElement>;
    onEditClick: MouseEventHandler<HTMLButtonElement>;
  };
}

const ModalFullScreenLayoutImage: FC<ModalFullScreenLayoutImageProps> = ({
  isOpen,
  onClose,
  backgroundColor,

  image,
  options,
}) => {
  const { top, bottom } = useReduxSelector((state) => state.reduxDevice.device);

  return (
    <ModalFullScreen
      isOpen={isOpen}
      onClose={onClose}
      backgroundColor={backgroundColor}
    >
      <LayoutHeader backgroundColor="transparent" shadowDisabled>
        <LayoutHeader.Option.RoundButton onClick={onClose}>
          <CloseIcon width="14px" height="14px" />
        </LayoutHeader.Option.RoundButton>
      </LayoutHeader>

      <LayoutBody.Common paddingX="0">
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
      </LayoutBody.Common>

      {options && (
        <LayoutFooter backgroundColor={backgroundColor}>
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
        </LayoutFooter>
      )}
    </ModalFullScreen>
  );
};

export default ModalFullScreenLayoutImage;
