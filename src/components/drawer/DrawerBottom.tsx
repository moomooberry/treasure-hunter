"use client";

import { FC, PropsWithChildren } from "react";
import { Sheet } from "react-modal-sheet";
import useReduxSelector from "@src/hooks/redux/useReduxSelector";

import STYLE from "./drawer.module.scss";

interface DrawerBottomProps {
  isOpen: boolean;
  onClose: VoidFunction;

  zIndex?: number;
  contentHeight?: string;
  paddingBottom?: string;
}

const DrawerBottom: FC<PropsWithChildren<DrawerBottomProps>> = ({
  isOpen,
  onClose,

  contentHeight = "50vh",
  zIndex = 2,
  paddingBottom,

  children,
}) => {
  const bottom = useReduxSelector((state) => state.reduxDevice.device.bottom);

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      detent="content-height"
      style={{ zIndex }}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div
            className={STYLE.__drawer_container}
            style={{
              height: contentHeight,
              minHeight: contentHeight,
              paddingBottom: paddingBottom ?? bottom,
            }}
          >
            {children}
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
  );
};

export default DrawerBottom;
