import { Status } from "../../shared/constants";

export type TUsePost = () => {
  status: Status;
  setStatus: (newStatus: Status) => void;
  post: TPost;
};

export type TState = {
  name: string | null;
  email: string | null;
  phone: string | null;
  text: string | null;
};

export type TPost = (state: TState) => Promise<void>;
