import * as ActionType from "./constants";
import { Action } from "../../../../store/types";
import { AppStateDetail } from "../../../../store/types";
import { SignupUser } from "./types";

const initialState: AppStateDetail<SignupUser> = {
  loading: false,
  data: null,
  error: null,
};

const userSignupReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.USER_SIGNUP_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }

    case ActionType.USER_SIGNUP_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }

    case ActionType.USER_SIGNUP_FAILED: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default userSignupReducer;
