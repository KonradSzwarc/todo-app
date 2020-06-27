import { AsyncState } from './types';

export const createAsyncState = <T>(initialData: T): AsyncState<T> => ({
  status: 'idle',
  data: initialData,
  error: null,
});
