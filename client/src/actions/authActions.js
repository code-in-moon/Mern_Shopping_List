import * as types from "./types";
import axios from "axios";
import { returnErrors } from "./errorActions";

//**************************************************************************************** */
//actually in authAction we interact with database and server (by using axios we send request from client) and then we pass this information to authReducer plus tell it what to do by actions types and authReducer interact with react and change yhe information in browser
//***************************************************************************************** */

// check token and load user
export const loadUser = () => (dispatch, getState) => {
  // user loading
  dispatch({ type: types.USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: types.USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: types.AUTH_ERROR,
      });
    });
};

//*************************************************************************************** */
//register user
export const register = ({ name, email, password }) => (dispatch) => {
  //create the headers of oue request to server
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //create req.body of our request to server
  // stringfy : convert javascript object to a jason
  const body = JSON.stringify({ name, email, password });

  //make a request to server
  axios
    .post("/api/users", body, config)
    .then((res) =>
      dispatch({
        type: types.REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({ type: types.REGISTER_FAIL });
    });
};

//************************************************************************** */
//log out
export const logout = () => {
  return {
    type: types.LOGOT_SUCCESS,
  };
};

//************************************************************************************* */
//set up config/headers and token
export const tokenConfig = (getState) => {
  //get token from localstorage in auth state
  const token = getState().auth.token;

  //Headers in axios
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };

  //if token then add to header
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
