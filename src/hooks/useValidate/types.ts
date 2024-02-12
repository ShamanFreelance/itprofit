import {
  EMailError,
  NameError,
  PhoneError,
  TextError,
  ValidatorField,
} from "./constants";

export type TErrors = Array<TError>;

export type TError = EMailError | NameError | PhoneError | TextError;

export type TUseValidate = (
  field: ValidatorField,
  date: string | null
) => TErrors;

export type TValidate = (date: string) => void;

export type TValidator = (date: string) => TErrors;

export type TValidatorSet = { [key in ValidatorField]: TValidator };
