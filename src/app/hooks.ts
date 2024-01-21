import { TypedUseSelectorHook, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { useSelector } from "react-redux";

type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
