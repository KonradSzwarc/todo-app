import { combineReducers } from '@reduxjs/toolkit';

import currentUserReducer from './currentUser';

export const rootReducer = combineReducers({
  currentUser: currentUserReducer,
});
