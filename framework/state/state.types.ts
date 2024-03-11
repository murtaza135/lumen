import { StateSlice } from './StateSlice';

export type QueryStatus = "loading" | "success" | "error";
export type MutationStatus = "loading" | "success" | "error";

export type StateValue<T extends StateSlice = StateSlice> = T["state"];

export type StateActions<T extends StateSlice = StateSlice> =
  Omit<T, "subscribe" | "state" | "hasSubscribers" | "destruct">
  & Record<string, any>;

export type StateSubscriber = (state: StateValue) => void;

export type QueryStateValue<T = any> = {
  isFetching: boolean;
  status: QueryStatus;
  data: T;
  error: any;
};

export type MutationStateValue<T = any> = {
  isFetching: boolean;
  status: MutationStatus;
  data: T;
  error: any;
};

export type QueryFunction = () => Promise<any>;
export type MutationFunction = (data: any) => Promise<any>;

export type Transformer<T = any> = (data: any) => T;