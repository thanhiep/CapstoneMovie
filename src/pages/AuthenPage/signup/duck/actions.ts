import * as ActionType from "./constants";
import { Action } from "../../../../store/types";
import api from "../../../../utils/apiUtil";
import { SignupUser } from "./types";

export const actFetchUserSignup = (user: SignupUser) => {
  return (dispatch: any) => {
    dispatch(actUserSignupRequest());
    //call api
    api
      .post(`QuanLyNguoiDung/DangKy`, user)
      .then((result) => {
        dispatch(actUserSignupSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actUserSignupFailed(error));
      });
  };
};

const actUserSignupRequest = (): Action => {
  return {
    type: ActionType.USER_SIGNUP_REQUEST,
  };
};

const actUserSignupSuccess = (data: any): Action => {
  return {
    type: ActionType.USER_SIGNUP_SUCCESS,
    payload: data,
  };
};

const actUserSignupFailed = (error: any): Action => {
  return {
    type: ActionType.USER_SIGNUP_FAILED,
    payload: error,
  };
};
