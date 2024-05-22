"use client";

import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  TextareaHTMLAttributes,
  forwardRef,
  useCallback,
  useState,
} from "react";

import STYLE from "./form.module.scss";
import classNames from "classnames";

interface FormTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "style"> {
  maxLength?: number;
  showMaxLength?: boolean;
  isError?: boolean;
  m?: string;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      maxLength,
      showMaxLength,
      isError,
      m = "0px",
      onChange,
      onInput,
      ...rest
    },
    ref
  ) => {
    const [length, setLength] = useState<number>(0);

    const onTextChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
      (event) => {
        const { value } = event.currentTarget;
        setLength(value.length);
        onChange?.(event);
      },
      [onChange]
    );

    const onTextInput = useCallback<FormEventHandler<HTMLTextAreaElement>>(
      (event) => {
        const { value } = event.currentTarget;
        if (maxLength && value.length >= maxLength) {
          event.currentTarget.value = value.slice(0, maxLength);
        }
        onInput?.(event);
      },
      [maxLength, onInput]
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
            [STYLE.__form_height_300]: true,
            [STYLE.__form_input]: true,
            [STYLE.__form_input_error]: isError,
          })}
          onChange={onTextChange}
          onInput={onTextInput}
          maxLength={maxLength}
          {...rest}
        />
        {maxLength && showMaxLength && (
          <div
            className={classNames({
              [STYLE.__form_input_max_length]: true,
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

export default FormTextarea;

FormTextarea.displayName = "FormTextarea";
