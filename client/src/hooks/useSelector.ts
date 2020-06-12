import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';

import { RootState } from '@/typings/redux';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
