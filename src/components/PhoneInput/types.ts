import { FunctionComponent } from "react";

export type TPhoneInputProps = {
  label: string;

  error?: boolean | undefined;
  message?: string | undefined;

  onChange: (value: string | null) => void;
  value: string | null;
};

export type TPhoneInput = FunctionComponent<TPhoneInputProps>;

/*
 Shared
 */

export type TGetPhone = (data: string) => string;

export type TGetPosition = (template: string) => number;

export type TGetNewPattern = (phone: string) => string;

export type TData = {
  phone: string;
  template: string;
  position: number;
};

export type TGetInitData = (phone: string) => TData;

export type TChangePosition = () => void
