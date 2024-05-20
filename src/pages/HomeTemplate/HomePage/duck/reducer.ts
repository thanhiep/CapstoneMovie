import * as ActionType from "./constants";
import { Action } from "../../../../store/types";
import { AppState } from "../../../../store/types";
import { Banner } from "./type";

const initialState: AppState<Banner> = {
    loading: false,
    data: null,
    error: null,
  };

  const bannerReducer = (state = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.BANNER_REQUEST: {
        state.loading = true;
        state.data = null;
        state.error = null;
        return { ...state };
      }
      case ActionType.BANNER_SUCCESS: {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        return { ...state };
      }
  
      case ActionType.BANNER_FAILED: {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        return { ...state };
      }
  
      default:
        return { ...state };
    }
  };
  
  export default bannerReducer;