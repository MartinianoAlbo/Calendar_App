import { combineReducers } from 'redux'
import { uiReducer } from '../reducers/uiReducer'
import { calendarReducer } from '../reducers/calendarReducer';
import { authReducer } from '../reducers/authReducer'

export const rootReducer = combineReducers({
    UI: uiReducer,
    calendar: calendarReducer,
    AUTH: authReducer,
});
