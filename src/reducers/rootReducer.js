import { combineReducers } from 'redux'
import { uiReducer } from '../reducers/uiReducer'
import { calendarReducer } from '../reducers/calendarReducer';

export const rootReducer = combineReducers({
    UI: uiReducer,
    calendar: calendarReducer,
});
