import { combineReducers } from "redux";
import listMovieReducer from "../pages/HomeTemplate/ListMoviePage/duck/reducer";
import movieDetailReducer from "../pages/HomeTemplate/DetailMovie/duck/reducer";
import userReducer from "../pages/AuthenPage/duck/reducer";

const rootReducers = combineReducers({
    listMovieReducer,
    movieDetailReducer,
    userReducer,
});

export default rootReducers;
