export const NOT_DIGIT_REG = new RegExp("\\D", "g");

export const PHONE_PATTERN: string = "+_ (___) ___-__-__";

export const PHONE_CHARACTER_COUNT: number =
  PHONE_PATTERN.split("_").length - 1;

export const PHONE_PLACEHOLDER = "Enter phone";
