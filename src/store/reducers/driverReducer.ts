import { DriversActionTypes } from '../types';
import { GET_DRIVERS_SUCCESS, GET_DRIVERS_ERROR } from '../types';

const initialState = {
  drivers: [],
  error: null,
};

export default function driversReducer(state = initialState, action: DriversActionTypes) {
  switch (action.type) {
    case GET_DRIVERS_SUCCESS:

    const newDrivers = action.payload.filter(driver => 
      !state.drivers.some(existingDriver => existingDriver.driverId === driver.driverId)
    );


      return {
        ...state,
        drivers: [...state.drivers, ...newDrivers],
      };
    case GET_DRIVERS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
