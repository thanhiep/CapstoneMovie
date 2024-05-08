import * as ActionType from "./constants";
import { Action } from "../../../store/types";
import api from "../../../utils/apiUtil";

export const actFetchUserLogin = (user: {
  taiKhoan: string;
  matKhau: string;
}) => {
  return (dispatch: any) => {
    dispatch(actUserLoginRequest());
    //call api
    api
      .post(`QuanLyNguoiDung/DangNhap`, user)
      .then((result) => {
        dispatch(actUserLoginSuccess(result.data.content));
        localStorage.setItem("user",JSON.stringify(result.data.content))
      })
      .catch((error) => {
        dispatch(actUserLoginFailed(error));
      });
  };
};

const actUserLoginRequest = (): Action => {
  return {
    type: ActionType.USER_LOGIN_REQUEST,
  };
};

const actUserLoginSuccess = (data: any): Action => {
  return {
    type: ActionType.USER_LOGIN_SUCCESS,
    payload: data,
  };
};

const actUserLoginFailed = (error: any): Action => {
  return {
    type: ActionType.USER_LOGIN_FAILED,
    payload: error,
  };
};
