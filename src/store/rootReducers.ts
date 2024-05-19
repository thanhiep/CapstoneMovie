import { combineReducers } from "redux";
import listMovieReducer from "../pages/HomeTemplate/ListMoviePage/duck/reducer";
import movieDetailReducer from "../pages/HomeTemplate/DetailMovie/duck/reducer";
import userReducer from "../pages/AuthenPage/login/duck/reducer";
import seatReducer, { datVeReducer, ticketBookReducer } from "../pages/HomeTemplate/TicketPage/duck/reducer";
import userSignupReducer from "../pages/AuthenPage/signup/duck/reducer";
import bannerReducer from "../pages/HomeTemplate/HomePage/duck/reducer";

const rootReducers = combineReducers({
    listMovieReducer,
    movieDetailReducer,
    userReducer,
    seatReducer,
    userSignupReducer,
    datVeReducer,
    ticketBookReducer,
    bannerReducer,
});

export default rootReducers;
