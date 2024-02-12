import { FunctionComponent } from "react";

export type TFormProps = {};

export type TForm = FunctionComponent<TFormProps>;

export type TState = {
  name: string | null;
  email: string | null;
  phone: string | null;
  text: string | null;
};

export type TGetEmptyData = () => TState;

export type TValidateState = (state: TState) => boolean;

export type TChangeHandler = (
  field: keyof TState,
  value: TState[keyof TState]
) => void;

export type TSubmit = () => Promise<void>;
