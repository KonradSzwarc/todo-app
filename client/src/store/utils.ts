import { equals } from '@/utils/equals';

import { AsyncState } from './types';

export const createAsyncState = <T>(initialData: T): AsyncState<T> => ({
  status: 'idle',
  data: initialData,
  error: null,
});

export const matchOptimistic = (a: object, b: object) => {
  const isEqualToOptimistic = equals(a, b);

  if (!isEqualToOptimistic) {
    console.warn('Optimistic update returns different value than the request', a, b);
  }

  return isEqualToOptimistic;
};
