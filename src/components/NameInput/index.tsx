import React, { memo, useCallback, useEffect, useRef, useState } from "react";

import { NAME_PLACEHOLDER, NAME_REG } from "./constants";
import { TData, TNameInput } from "./types";
import { getNewData, replaceValue } from "./utils";

import InputWrapper from "../InputWrapper";

import useValidate from "../../hooks/useValidate";
import { TInputChangeHandler } from "../../shared/types";
import { ValidatorField } from "../../hooks/useValidate/constants";

const NameInput: TNameInput = (props) => {
  const { value, onChange, label, error, message } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<TData>(getNewData(value));

  const { name, position } = data;

  const errors = useValidate(ValidatorField.Name, name);

  const changeHandler: TInputChangeHandler = useCallback(
    (event) => {
      const { value } = event.target;

      const isCorrectName = NAME_REG.test(value);
      const currentPosition: number | null = event.target.selectionStart;

      let newPosition: number | null;
      let newName: string | null;

      if (isCorrectName) {
        newPosition = event.target.selectionStart;
        newName = replaceValue(value);
      } else if (currentPosition !== null) {
        newPosition = currentPosition - 1;
        newName = name;
      } else {
        newPosition = currentPosition;
        newName = name;
      }

      setData({
        name: newName,
        position: newPosition,
      });

      onChange(newName);
    },
    [setData, onChange, name]
  );

  /*
    Update 'data' if 'value' changes
  */
  useEffect(() => {
    if (value === name) {
      return;
    }

    setData((last) => {
      return { name: value, position: last.position };
    });
  }, [setData, value, name]);

  /*
    TODO: Move to hook
    Update cursor position
  */
  useEffect(() => {
    if (ref === null || ref.current === null) {
      return;
    }

    ref.current.setSelectionRange(position, position);
  }, [ref, data, position]);

  const hasWarning = name !== null && name.length > 0 && errors.length > 0;
  const msg = hasWarning ? errors[0] : message;

  return (
    <InputWrapper
      message={msg}
      warning={hasWarning}
      error={error}
      label={label}
      render={(classes) => (
        <input
          ref={ref}
          className={classes}
          placeholder={NAME_PLACEHOLDER}
          value={name || ""}
          onChange={changeHandler}
        />
      )}
    />
  );
};

export default memo(NameInput);
