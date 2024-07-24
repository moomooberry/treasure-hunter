"use client";

import {
  ChangeEventHandler,
  FocusEventHandler,
  FormEventHandler,
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from "react";
import classNames from "classnames";

import STYLE from "./form.input.text.module.scss";

interface FormInputTextProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "style" | "type"> {
  maxLength?: number;
  showMaxLength?: boolean;
  isError?: boolean;
  m?: string;
}

const FormInputText = forwardRef<HTMLInputElement, FormInputTextProps>(
  (
    {
      maxLength,
      showMaxLength,
      isError,
      m = "0px",
      onChange,
      onInput,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const maxCountRef = useRef<HTMLDivElement>(null);

    const [length, setLength] = useState<number>(0);

    const onTextChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      (event) => {
        const { value } = event.currentTarget;
        setLength(value.length);
        onChange?.(event);
      },
      [onChange]
    );

    const onTextInput = useCallback<FormEventHandler<HTMLInputElement>>(
      (event) => {
        const { value } = event.currentTarget;
        if (maxLength && value.length >= maxLength) {
          event.currentTarget.value = value.slice(0, maxLength);
        }
        onInput?.(event);
      },
      [maxLength, onInput]
    );

    const onTextFocus = useCallback<FocusEventHandler<HTMLInputElement>>(
      (event) => {
        const maxCount = maxCountRef.current;
        if (maxCount && !isError) {
          maxCount.style.color = "#636e72";
        }
        onFocus?.(event);
      },
      [onFocus, isError]
    );

    const onTextBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
      (event) => {
        const maxCount = maxCountRef.current;
        if (maxCount && !isError) {
          maxCount.style.color = "#b2bec3";
        }
        onBlur?.(event);
      },
      [onBlur, isError]
    );

    return (
      <div
        style={{
          margin: m,
        }}
      >
        <input
          ref={ref}
          className={classNames({
            [STYLE.__form_input]: true,
            [STYLE.__form_input_normal]: !isError,
            [STYLE.__form_input_error]: isError,
          })}
          onInput={onTextInput}
          onChange={onTextChange}
          onFocus={onTextFocus}
          onBlur={onTextBlur}
          maxLength={maxLength}
          {...rest}
        />

        {maxLength && showMaxLength && (
          <div
            ref={maxCountRef}
            className={classNames({
              [STYLE.__form_input_max_length]: true,
              [STYLE.__form_input_max_length_normal]: !isError,
              [STYLE.__form_input_max_length_error]: isError,
            })}
          >
            {length}/{maxLength}
          </div>
        )}
      </div>
    );
  }
);

export default FormInputText;

FormInputText.displayName = "FormInputText";
