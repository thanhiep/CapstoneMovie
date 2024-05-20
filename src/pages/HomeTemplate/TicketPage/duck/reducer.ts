import * as ActionType from "./constants";
import { Action, AppStateDetail } from "../../../../store/types";
import { DanhSachGhe, ThongTinDatVe, ThongTinVe } from "./type";

const initialState: AppStateDetail<ThongTinDatVe> = {
  loading: false,
  data: null,
  error: null,
};

const seatReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SEATS_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    case ActionType.SEATS_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }

    case ActionType.SEATS_FAILED: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

const initialTicketState: any = {
  danhSachGheDangChon: [],
};

export const datVeReducer = (state = initialTicketState, action: Action) => {
  switch (action.type) {
    case ActionType.CHON_VE: {
      const danhSachGheDangChonClone = [...state.danhSachGheDangChon];
      const gheDangChon = action.payload;
      if (danhSachGheDangChonClone.length > 0) {
        const index = danhSachGheDangChonClone.findIndex(
          (ghe: DanhSachGhe) => ghe.maGhe === gheDangChon.maGhe
        );
        if (index !== -1) {
          danhSachGheDangChonClone.splice(index, 1);
        } else {
          danhSachGheDangChonClone.push(gheDangChon);
        }
      } else {
        danhSachGheDangChonClone.push(gheDangChon);
      }

      state.danhSachGheDangChon = danhSachGheDangChonClone;
      return { ...state };
    }

    case ActionType.RESET_GHE_DANG_CHON: {
      state.danhSachGheDangChon = []
      return {...state}
    }

    default:
      return { ...state };
  }
};

const initialTicketBookState:AppStateDetail<ThongTinVe> = {
  loading: false,
  data: null,
  error: null
}

export const ticketBookReducer = (state = initialTicketBookState, action: Action) => {
  switch (action.type) {
    case ActionType.TICKET_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }
    case ActionType.TICKET_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }

    case ActionType.TICKET_FAILED: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default seatReducer;
