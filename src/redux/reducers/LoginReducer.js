import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_RESET,
} from "../constants/LoginConstants";

const initialState = {
  isLoading: false,
  data: null,
  error: "",
};

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING: {
      return {
        isLoading: true,
        data: null,
        error: "",
      };
    }

    case LOGIN_SUCCESS: {
      return {
        isLoading: false,
        data: action.payload,
        error: "",
      };
    }

    case LOGIN_FAILED: {
      return {
        isLoading: false,
        data: null,
        error: action.payload,
      };
    }

    case LOGIN_RESET: {
      return {
        isLoading: false,
        data: null,
        error: "",
      };
    }

    default:
      return state;
  }
}
