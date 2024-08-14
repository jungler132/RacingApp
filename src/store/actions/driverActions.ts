import axios from 'axios';
import { Dispatch } from 'redux';
import { GET_DRIVERS_SUCCESS, GET_DRIVERS_ERROR } from '../types';

export const fetchDrivers = (page: number = 1) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(
        `https://ergast.com/api/f1/drivers.json?limit=10&offset=${(page - 1) * 10}`
      );
      dispatch({
        type: GET_DRIVERS_SUCCESS,
        payload: response.data.MRData.DriverTable.Drivers,
      });
    } catch (error) {
      dispatch({
        type: GET_DRIVERS_ERROR,
        payload: error.message,
      });
    }
  };
};
