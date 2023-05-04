import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  REGISTER_RESET,
} from "../constants/RegisterConstants";

const initialState = {
  isLoading: false,
  data: null,
  error: "",
};

export default function RegisterReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_LOADING: {
      return {
        isLoading: true,
        data: null,
        error: "",
      };
    }

    case REGISTER_SUCCESS: {
      return {
        isLoading: false,
        data: action.payload,
        error: "",
      };
    }

    case REGISTER_FAILED: {
      return {
        isLoading: false,
        data: null,
        error: action.payload,
      };
    }

    case REGISTER_RESET: {
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
