import { combineReducers } from '@reduxjs/toolkit';

import currentUserReducer from './currentUser';
import tasksReducer from './tasks';

export const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  tasks: tasksReducer,
});
