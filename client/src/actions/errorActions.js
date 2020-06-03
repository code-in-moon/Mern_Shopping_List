import * as types from "./types";

//RETURN ERROR
export const returnErrors = (msg, status, id = null) => {
  return {
    type: types.GET_ERRORS,
    payload: { msg, status, id },
  };
};

export const clearErrors = () => {
  return {
    type: types.CLEAR_ERROR,
  };
};
