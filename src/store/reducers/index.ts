import { combineReducers } from 'redux';
import driversReducer from './driverReducer';


const rootReducer = combineReducers({
  drivers: driversReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
