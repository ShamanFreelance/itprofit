import { TGetNewData, TReplaceValue } from "./types";

export const replaceValue: TReplaceValue = (value) => {
  return value.toUpperCase();
};

export const getNewData: TGetNewData = (name) => {
  return {
    name,
    position: null,
  };
};
