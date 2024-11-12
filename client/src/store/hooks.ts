import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import { AppDispatch, RootState } from "./store.ts";

type DispatchFunction = () => AppDispatch;

export const useUserDispatch: DispatchFunction = useDispatch;
export const useUserSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSessionDispatch: DispatchFunction = useDispatch;
export const useSessionSelector: TypedUseSelectorHook<RootState> = useSelector;
