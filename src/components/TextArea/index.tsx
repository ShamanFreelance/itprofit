import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";
import { TTextArea } from "./types";
import { TEXT_PLACEHOLDER } from "./constants";

import InputWrapper from "../InputWrapper";

import useValidate from "../../hooks/useValidate";
import { TTextAreaChangeHandler } from "../../shared/types";
import { ValidatorField } from "../../hooks/useValidate/constants";
import { LATIN_NUM_PUNCT_REG } from "../../shared/constants";

const TextArea: TTextArea = (props) => {
  const { value, onChange, label, error, message } = props;

  const ref = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string | null>(value);

  const errors = useValidate(ValidatorField.Text, text);

  const changeHandler: TTextAreaChangeHandler = useCallback(
    (event) => {
      const { value } = event.target;

      if (!LATIN_NUM_PUNCT_REG.test(value)) {
        return;
      }

      setText(value);
      onChange(value);
    },
    [setText, onChange]
  );

  /*
    TODO:Move to hook
    Textarea auto resize
   */
  useEffect(() => {
    if (ref.current === null) {
      return;
    }

    ref.current.style.height = "0px";
    ref.current.style.height = ref.current.scrollHeight + "px";
  }, [text, ref]);

  /*
    Update 'text' if 'value' changes
  */
  useEffect(() => {
    if (value === text) {
      return;
    }

    setText(value);
  }, [setText, value, text]);

  const hasWarning = text !== null && text.length > 0 && errors.length > 0;
  const msg = hasWarning ? errors[0] : message;

  return (
    <InputWrapper
      message={msg}
      warning={hasWarning}
      error={error}
      label={label}
      render={(classes) => (
        <textarea
          ref={ref}
          className={classNames(classes, styles.textarea)}
          placeholder={TEXT_PLACEHOLDER}
          value={text === null ? "" : text}
          onChange={changeHandler}
        />
      )}
    />
  );
};

export default memo(TextArea);
