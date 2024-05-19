import * as ActionType from "./constants";
import { Action } from "../../../../store/types";
import api from "../../../../utils/apiUtil";
import { ThongTinDatVe, ThongTinVe } from "./type";

export const actFetchSeatData = (id: number | string) => {
  return (dispatch: any) => {
    dispatch(actSeatRequest());
    // call api
    api
      .get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`)
      .then((result) => {
        dispatch(actSeatSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actSeatFailed(error));
      });
  };
};

const actSeatRequest = (): Action => {
  return {
    type: ActionType.SEATS_REQUEST,
  };
};

const actSeatSuccess = (data: ThongTinDatVe): Action => {
  return {
    type: ActionType.SEATS_SUCCESS,
    payload: data,
  };
};

const actSeatFailed = (error: any): Action => {
  return {
    type: ActionType.SEATS_FAILED,
    payload: error,
  };
};


// Đặt vé

export const actFetchTicketData = (ve:ThongTinVe) => {
  return (dispatch: any) => {
    dispatch(actTicketRequest());
    // call api
    api
      .post(`/QuanLyDatVe/DatVe`,ve)
      .then((result) => {
        dispatch(actTicketSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actTicketFailed(error));
      });
  };
};

const actTicketRequest = (): Action => {
  return {
    type: ActionType.TICKET_REQUEST,
  };
};

const actTicketSuccess = (data: ThongTinVe): Action => {
  return {
    type: ActionType.TICKET_SUCCESS,
    payload: data,
  };
};

const actTicketFailed = (error: any): Action => {
  return {
    type: ActionType.TICKET_FAILED,
    payload: error,
  };
};