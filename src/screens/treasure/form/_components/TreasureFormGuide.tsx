"use client";

import { FC, useEffect, useState } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { useAnimate } from "framer-motion";

import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import { LAYOUT_HEADER_HEIGHT } from "@src/constants/layout";

import { TreasureFormFields } from "../TreasureFormView";

interface TreasureFormGuideProps {
  formMethods: UseFormReturn<TreasureFormFields>;
}

const textList = [
  "보물을 숨기려면 해당 지점 근처에 계셔야 해요.",
  "보물 위치를 지도에 마킹해보세요.",
];
// TODO -> TreasureFormGuide feature
const TreasureFormGuide: FC<TreasureFormGuideProps> = ({
  formMethods: { control },
}) => {
  const top = useReduxSelector((state) => state.reduxDevice.device.top);

  const slideIndex = useWatch({ control, name: "slideIndex" });

  const [scope, animate] = useAnimate<HTMLDivElement>();

  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => {
        const result = prev + 1;

        if (result === textList.length) {
          clearTimeout(timer);
        }

        return result;
      });
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (textIndex >= textList.length) return;

    animate(
      scope.current,
      { y: [20, 0], opacity: [0, 1] },
      { duration: 1 }
    ).then(() => {
      animate(
        scope.current,
        { y: [0, -20], opacity: [1, 0] },
        { duration: 1, delay: 4 }
      );
    });
  }, [animate, scope, textIndex]);

  return (
    textList[textIndex] && (
      <div
        style={{
          top: `calc(${top} + ${LAYOUT_HEADER_HEIGHT})`,
          zIndex: 2,
          position: "absolute",
          left: "0",
          width: "100%",
          height: "100px",
          padding: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          ref={scope}
          style={{
            fontWeight: 500,
            lineHeight: "22px",
            boxShadow: "0 5px 20px 0 #d5d5d5",
            textAlign: "center",
            wordBreak: "keep-all",
            color: "#191919",
            padding: "18px",
            margin: "0 20px",
            borderRadius: "20px",
            backgroundColor: "#ffffffe9",
          }}
        >
          {textList[textIndex]}
        </div>
      </div>
    )
  );
};

export default TreasureFormGuide;
