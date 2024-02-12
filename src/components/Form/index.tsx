import React, { memo, useCallback, useEffect, useState } from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";
import { getEmptyData, validateState } from "./utils";
import { TChangeHandler, TForm, TState, TSubmit } from "./types";
import { DEFAULT_ERROR_MESSAGE } from "./constants";

import NameInput from "./../NameInput/index";
import MailInput from "./../EMailInput/index";
import PhoneInput from "./../PhoneInput/index";
import TextArea from "./../TextArea/index";
import Spinner from "./../Spinner/index";
import ModalForm from "./../ModalForm/index";

import usePost from "./../../hooks/usePost/index";
import { REQUEST_ERROR, Status } from "../../shared/constants";
import useValidate from "./../../hooks/useValidate/index";
import { ValidatorField } from "../../hooks/useValidate/constants";

const Form: TForm = () => {
  const [state, setState] = useState<TState>(getEmptyData());
  const [showError, setShowError] = useState<boolean>(false);

  // TODO: create general hook
  const nameErrors = useValidate(ValidatorField.Name, state.name);
  const emailErrors = useValidate(ValidatorField.EMail, state.email);
  const phoneErrors = useValidate(ValidatorField.Phone, state.phone);
  const textErrors = useValidate(ValidatorField.Text, state.text);

  const { post, status, setStatus } = usePost();

  const changeHandler: TChangeHandler = useCallback(
    (field, value) => {
      if (status !== Status.pending) {
        setStatus(Status.pending);
      }

      setState((oldState) => {
        return { ...oldState, [field]: value };
      });
    },
    [setState, status]
  );

  const checkValidation = () => {
    return (
      validateState(state) &&
      nameErrors.length === 0 &&
      emailErrors.length === 0 &&
      phoneErrors.length === 0 &&
      textErrors.length === 0
    );
  };

  const submit: TSubmit = useCallback(async () => {
    setStatus(Status.pending);

    if (!checkValidation()) {
      setShowError(true);

      return;
    }

    await post(state);

    setShowError(false);
  }, [state, post, checkValidation]);

  /*
    Clear Form
   */
  useEffect(() => {
    if (status === Status.success) {
      setState(getEmptyData());
    }
  }, [status, setState]);

  /*
    Unlock btn if it was locked and now all fields filled
   */
  useEffect(() => {
    if (showError && checkValidation()) {
      setShowError(false);
    }
  }, [showError, state]);

  const { email, name, text, phone } = state;

  const isDisabled =
    (showError && !checkValidation()) || status === Status.loading;

  const needMessage: boolean =
    status !== Status.pending && status !== Status.loading;

  const btnClasses = classNames(styles.btn, isDisabled && styles.btn__disabled);

  // TODO: need minimize
  const nameError =
    (name === null || name.length === 0 || nameErrors.length !== 0) &&
    showError;
  const emailError =
    (email === null || email.length === 0 || emailErrors.length !== 0) &&
    showError;
  const phoneError =
    (phone === null || phone.length === 0 || phoneErrors.length !== 0) &&
    showError;
  const textError =
    (text === null || text.length === 0 || textErrors.length !== 0) &&
    showError;

  return status === Status.loading ? (
    <Spinner />
  ) : (
    <div className={styles.container}>
      <div className={styles.title}>Registration</div>
      <NameInput
        error={nameError}
        message={nameError ? DEFAULT_ERROR_MESSAGE : undefined}
        value={name}
        onChange={(value) => changeHandler("name", value)}
        label={"Name"}
      />
      <MailInput
        error={emailError}
        message={emailError ? DEFAULT_ERROR_MESSAGE : undefined}
        value={email}
        onChange={(value) => changeHandler("email", value)}
        label={"Email"}
      />
      <PhoneInput
        error={phoneError}
        message={phoneError ? DEFAULT_ERROR_MESSAGE : undefined}
        value={phone}
        onChange={(value) => changeHandler("phone", value)}
        label={"Phone"}
      />
      <TextArea
        error={textError}
        message={textError ? DEFAULT_ERROR_MESSAGE : undefined}
        value={text}
        onChange={(value) => changeHandler("text", value)}
        label={"Message"}
      />
      <div className={styles.btnContainer}>
        <button disabled={isDisabled} className={btnClasses} onClick={submit}>
          Submit
        </button>
      </div>

      {needMessage && (
        <ModalForm
          open={true}
          error={status === Status.error}
          message={REQUEST_ERROR[status]}
        />
      )}
    </div>
  );
};

export default memo(Form);
