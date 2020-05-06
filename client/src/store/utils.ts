import { AnyAction } from '@reduxjs/toolkit';
import { useDispatch } from '@hooks/useDispatch';

export type AsyncState<T> = {
  status: 'idle' | 'loading' | 'success' | 'failure';
  data: T;
  error: string | null;
};

export const createAsyncState = <T>(initialData: T): AsyncState<T> => ({
  status: 'idle',
  data: initialData,
  error: null,
});

export const useDispatcher = () => {
  const dispatch = useDispatch();

  return <T extends Array<unknown>, P extends AnyAction>(fn: (...args: T) => P) => (...args: T) =>
    dispatch(fn(...args));
};
