import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import { AppDispatch, RootState } from "./store.ts";

type DispatchFunction = () => AppDispatch;

// export const useChatDispatch: DispatchFunction = useDispatch;
// export const useChatSelector: TypedUseSelectorHook<RootState> = useSelector;
