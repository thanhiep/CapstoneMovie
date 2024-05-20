import * as ActionType from "./constants";
import { Action } from "../../../../store/types";
import { AppStateDetail } from "../../../../store/types";
import { MovieDetail } from "./types";

const initialState: AppStateDetail<MovieDetail> = {
  loading: false,
  data: null,
  error: null,
};

const movieDetailReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.MOVIE_DETAIL_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }

    case ActionType.MOVIE_DETAIL_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }

    case ActionType.MOVIE_DETAIL_FAILED: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default movieDetailReducer;
