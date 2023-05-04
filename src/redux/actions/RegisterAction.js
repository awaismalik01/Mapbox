import { GET, POST } from "../../API/server";
import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  REGISTER_RESET,
} from "../constants/RegisterConstants";

const Success = (payload) => ({
  type: REGISTER_SUCCESS,
  payload,
});

const Failed = (payload) => ({
  type: REGISTER_FAILED,
  payload,
});

export const ResetRegister = () => ({
  type: REGISTER_RESET,
});

export const RegisterAction = (payload) => (dispatch) => {
  dispatch({ type: REGISTER_LOADING });

  GET("?email=" + payload?.email)
    .then((res) => {
      if (!res?.data?.length) {
        POST(payload)
          .then((res) => dispatch(Success(res?.data)))
          .catch((err) => dispatch(Failed("Something went wrong")));
      } else {
        dispatch(Failed("Email already exist"));
      }
    })
    .catch(() => dispatch(Failed("Something went wrong")));
};
