import { TGetInitData, TGetNewPattern, TGetPhone, TGetPosition } from "./types";
import {
  NOT_DIGIT_REG,
  PHONE_CHARACTER_COUNT,
  PHONE_PATTERN,
} from "./constants";

export const getPhone: TGetPhone = (value) => {
  return value.replace(NOT_DIGIT_REG, "").slice(0, PHONE_CHARACTER_COUNT);
};

export const getPosition: TGetPosition = (template) => {
  const underscoreIndex =
    template.indexOf("_") === -1 ? null : template.indexOf("_");

  return underscoreIndex === null ? template.length : underscoreIndex;
};

export const getNewPattern: TGetNewPattern = (phone) => {
  const newPatternChars: Array<string> = PHONE_PATTERN.split("");

  const matches = newPatternChars
    .map((char, index) => (char === "_" ? index : null))
    .filter((el) => el !== null) as Array<number>;
  phone.split("").forEach((char, index) => {
    const patternIndex = matches[index];

    if (patternIndex === undefined) {
      return;
    }

    newPatternChars[patternIndex] = char;
  });

  return newPatternChars.join("");
};

export const getInitData: TGetInitData = (phone) => {
  const newPattern = getNewPattern(phone);
  const newPosition = getPosition(newPattern);

  return {
    phone,
    template: newPattern,
    position: newPosition,
  };
};
