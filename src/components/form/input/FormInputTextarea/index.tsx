"use client";

import {
  ChangeEventHandler,
  FocusEventHandler,
  FormEventHandler,
  TextareaHTMLAttributes,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from "react";
import classNames from "classnames";

import STYLE from "./form.input.textarea.module.scss";

interface FormInputTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "style"> {
  maxLength?: number;
  showMaxLength?: boolean;
  isError?: boolean;
  m?: string;
}

const FormInputTextarea = forwardRef<
  HTMLTextAreaElement,
  FormInputTextareaProps
>(
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
    const maxLengthRef = useRef<HTMLDivElement>(null);

    const [length, setLength] = useState<number>(0);

    const onTextareaChange = useCallback<
      ChangeEventHandler<HTMLTextAreaElement>
    >(
      (event) => {
        const { value } = event.currentTarget;
        setLength(value.length);
        onChange?.(event);
      },
      [onChange]
    );

    const onTextareaInput = useCallback<FormEventHandler<HTMLTextAreaElement>>(
      (event) => {
        const { value } = event.currentTarget;
        if (maxLength && value.length >= maxLength) {
          event.currentTarget.value = value.slice(0, maxLength);
        }
        onInput?.(event);
      },
      [maxLength, onInput]
    );

    const onTextareaFocus = useCallback<FocusEventHandler<HTMLTextAreaElement>>(
      (event) => {
        const maxLength = maxLengthRef.current;
        if (maxLength && !isError) {
          maxLength.style.color = "#636e72";
        }
        onFocus?.(event);
      },
      [onFocus, isError]
    );

    const onTextareaBlur = useCallback<FocusEventHandler<HTMLTextAreaElement>>(
      (event) => {
        const maxLength = maxLengthRef.current;
        if (maxLength && !isError) {
          maxLength.style.color = "#b2bec3";
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
        <textarea
          ref={ref}
          className={classNames({
            [STYLE.__form_input_textarea]: true,
            [STYLE.__form_input_textarea_normal]: !isError,
            [STYLE.__form_input_textarea_error]: isError,
          })}
          onChange={onTextareaChange}
          onInput={onTextareaInput}
          onFocus={onTextareaFocus}
          onBlur={onTextareaBlur}
          maxLength={maxLength}
          {...rest}
        />

        {maxLength && showMaxLength && (
          <div
            ref={maxLengthRef}
            className={classNames({
              [STYLE.__form_input_textarea_max_length]: true,
              [STYLE.__form_input_textarea_max_length_normal]: !isError,
              [STYLE.__form_input_textarea_max_length_error]: isError,
            })}
          >
            {length}/{maxLength}
          </div>
        )}
      </div>
    );
  }
);

export default FormInputTextarea;

FormInputTextarea.displayName = "FormTextarea";
