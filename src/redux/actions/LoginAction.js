import { GET } from "../../API/server";
import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_RESET,
} from "../constants/LoginConstants";

const Success = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

const Failed = (payload) => ({
  type: LOGIN_FAILED,
  payload,
});

export const ResetLogin = () => ({
  type: LOGIN_RESET,
});

export const RegisterLogin = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const LoginAction = (payload) => (dispatch) => {
  dispatch({ type: LOGIN_LOADING });

  GET("?email=" + payload?.email)
    .then((res) => {
      if (!!res?.data?.length) {
        if (res?.data?.[0]?.password === payload?.password) {
          dispatch(
            Success({ name: res?.data?.[0]?.name, email: res?.data?.[0]?.email })
          );
        } else {
          dispatch(Failed("Incorrect Password"));
        }
      } else {
        dispatch(Failed("Email does not exist"));
      }
    })
    .catch(() => dispatch(Failed("Something went wrong")));
};
