export const GET_DRIVERS_SUCCESS = 'GET_DRIVERS_SUCCESS';
export const GET_DRIVERS_ERROR = 'GET_DRIVERS_ERROR';

interface GetDriversSuccessAction {
  type: typeof GET_DRIVERS_SUCCESS;
  payload: any[];
}

interface GetDriversErrorAction {
  type: typeof GET_DRIVERS_ERROR;
  payload: string;
}

export type DriversActionTypes = GetDriversSuccessAction | GetDriversErrorAction;
