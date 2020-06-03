import * as types from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.USER_LOADING:
      return { ...state, isLoading: true };
    case types.USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        usser: action.payload,
      };
    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuthenticated: true,
      };

    case types.AUTH_ERROR:
    case types.LOGIN_FAIL:
    case types.REGISTER_FAIL:
    case types.LOGOT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
