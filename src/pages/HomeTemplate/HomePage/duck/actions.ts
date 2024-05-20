import * as ActionType from "./constants";
import { Banner } from "./type";
import { Action } from "../../../../store/types";
import api from "../../../../utils/apiUtil";

export const actFetchBannerData = () => {
  return (dispatch: any) => {
    dispatch(actBannerRequest());
    // call api
    api
      .get(`QuanLyPhim/LayDanhSachBanner`)
      .then((result) => {
        dispatch(actBannerSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actBannerFailed(error));
      });
  };
};

const actBannerRequest = (): Action => {
  return {
    type: ActionType.BANNER_REQUEST,
  };
};

const actBannerSuccess = (data: Banner[]): Action => {
  return {
    type: ActionType.BANNER_SUCCESS,
    payload: data,
  };
};

const actBannerFailed = (error: any): Action => {
  return {
    type: ActionType.BANNER_FAILED,
    payload: error,
  };
};
