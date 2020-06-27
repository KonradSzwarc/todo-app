import { PayloadAction } from '@reduxjs/toolkit';

export type AsyncState<T> = {
  status: 'idle' | 'loading' | 'success' | 'failure';
  data: T;
  error: string | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WorkerAction<T extends (...args: any[]) => any> = PayloadAction<Parameters<T>[0]>;
