import { FunctionComponent } from "react";

export type TNameInputProps = {
  label: string;

  error?: boolean | undefined;
  message?: string | undefined;

  onChange: (value: string | null) => void;
  value: string | null;
};

export type TNameInput = FunctionComponent<TNameInputProps>;

export type TData = {
  name: string | null;
  position: number | null;
};

export type TReplaceValue = (value: string) => string;

export type TGetNewData = (name: string | null) => TData;
