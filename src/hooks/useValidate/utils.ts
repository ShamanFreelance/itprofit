import {
  EMAIL_REG,
  EMailError,
  MAX_NAME_LENGTH,
  MAX_TEXT_LENGTH,
  MIN_NAME_LENGTH,
  MIN_TEXT_LENGTH,
  NameError,
  PHONE_CHARACTER_COUNT,
  PHONE_REG,
  PhoneError,
  TextError,
  WORD_REG,
} from "./constants";
import { TErrors, TValidator } from "./types";

export const emailValidator: TValidator = (email) => {
  const errors: TErrors = [];

  if (!EMAIL_REG.test(email)) {
    errors.push(EMailError.Incorrect);
  }

  return errors;
};

export const nameValidator: TValidator = (name) => {
  const errors: TErrors = [];

  const isWord = WORD_REG.test(name);

  if (!isWord) {
    errors.push(NameError.WordCount);
  }

  const checkedName = isWord ? name : "";

  if (checkedName.length < MIN_NAME_LENGTH) {
    errors.push(NameError.NameMinLength);
  }

  if (checkedName.length > MAX_NAME_LENGTH) {
    errors.push(NameError.NameMaxLength);
  }
  return errors;
};

export const phoneValidator: TValidator = (phone) => {
  const errors: TErrors = [];

  if (!PHONE_REG.test(phone)) {
    errors.push(PhoneError.Code);
  }

  if (phone.length < PHONE_CHARACTER_COUNT) {
    errors.push(PhoneError.Length);
  }

  return errors;
};

export const textValidator: TValidator = (phone) => {
  const errors: TErrors = [];

  if (phone.length < MIN_TEXT_LENGTH) {
    errors.push(TextError.MIN_LENGTH);
  }

  if (phone.length > MAX_TEXT_LENGTH) {
    errors.push(TextError.MAX_LENGTH);
  }

  return errors;
};
