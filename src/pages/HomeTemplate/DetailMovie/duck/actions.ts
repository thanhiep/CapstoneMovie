import * as ActionType from "./constants";
import { Action } from "../../../../store/types";
import api from "../../../../utils/apiUtil";

export const actFetchDetailMovie = (id: number | string) => {
  return (dispatch: any) => {
    dispatch(actDetailMovieRequest());
    //call api
    api
      .get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
      .then((result) => {
        dispatch(actDetailMovieSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actDetailMovieFailed(error));
      });
  };
};

const actDetailMovieRequest = (): Action => {
  return {
    type: ActionType.MOVIE_DETAIL_REQUEST,
  };
};

const actDetailMovieSuccess = (data: any): Action => {
  return {
    type: ActionType.MOVIE_DETAIL_SUCCESS,
    payload: data,
  };
};

const actDetailMovieFailed = (error: any): Action => {
  return {
    type: ActionType.MOVIE_DETAIL_FAILED,
    payload: error,
  };
};


