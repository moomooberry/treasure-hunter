"use client";

import useReduxSelector from "@src/hooks/redux/useReduxSelector";
import {
  FormEvent,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import getTreasure from "@src/api/treasure/getTreasure";
import { API_GET_TREASURE_KEY } from "@src/libs/fetch/key/treasure";

import STYLE from "./treasure.detail.footer.module.scss";

interface TreasureDetailFooterFormFields {
  text: string;
}

const TreasureDetailFooter = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const paddingBottom = useReduxSelector(
    (state) => state.reduxDevice.device.bottom
  );

  const [isKeyboardUp, setIsKeyboardUp] = useState<boolean>(false);

  const { id } = useParams();

  const { data } = useQuery({
    queryKey: [API_GET_TREASURE_KEY, { id }],
    queryFn: () => getTreasure({ id: id as string }),
  });

  const { register, handleSubmit, control, setValue } =
    useForm<TreasureDetailFooterFormFields>({
      defaultValues: {
        text: "",
      },
    });

  const { ref, ...rest } = register("text");

  useImperativeHandle(ref, () => textareaRef.current);

  const onValid = useCallback<SubmitHandler<TreasureDetailFooterFormFields>>(
    ({ text }) => {
      setValue("text", "");
      if (textareaRef.current) {
        textareaRef.current.style.height = "22px";
        textareaRef.current.style.marginTop = "5px";
      }
      // TODO post mutate
      console.log("text", text);
    },
    [setValue]
  );

  const onInput = useCallback((event: FormEvent<HTMLTextAreaElement>) => {
    event.currentTarget.style.height = "22px";
    event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
    event.currentTarget.style.marginTop = "5px";

    const heightNumber = Number(event.currentTarget.style.height.slice(0, -2));
    if (heightNumber > 22) {
      event.currentTarget.style.marginTop = "0px";
    }
    if (heightNumber > 88) {
      event.currentTarget.style.marginTop = "-8px";
    }

    const target = event.currentTarget.value;
    if (target.length > 300) {
      event.currentTarget.value = target.slice(0, 300);
    }
  }, []);

  const onFocus = useCallback(() => {
    setIsKeyboardUp(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsKeyboardUp(false);
  }, []);

  return (
    data && (
      <div
        className={STYLE.__treasure_detail_footer_input_box}
        style={{
          padding: `14px 20px calc(14px + ${
            isKeyboardUp ? "0px" : paddingBottom
          }) 20px`,
        }}
      >
        <div className={STYLE.__treasure_detail_footer_input_wrapper}>
          <div
            style={{
              minWidth: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "gray",
            }}
          />
          <textarea
            className={STYLE.__treasure_detail_footer_textarea}
            ref={textareaRef}
            {...rest}
            placeholder="댓글 남기기 최대 300자"
            maxLength={300}
            onInput={onInput}
            onFocus={onFocus}
            onBlur={onBlur}
          />

          <div className={STYLE.__treasure_detail_submit_wrapper}>
            <Controller
              control={control}
              name="text"
              render={({ field: { value } }) => (
                <button
                  className={STYLE.__treasure_detail_submit_button}
                  onClick={handleSubmit(onValid)}
                  disabled={!value}
                >
                  저장
                </button>
              )}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default TreasureDetailFooter;
