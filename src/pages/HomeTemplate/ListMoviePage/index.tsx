import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchListData } from "./duck/actions";
import { RootState } from "../../../store";
import "./style.css";
import "./../_components/css/loader.css";
import MovieComponent from "./movie";
import { Movie } from "./duck/type";

export default function ListMoviePage() {
  const dispatch: any = useDispatch();

  const { loading, data } = useSelector(
    (state: RootState) => state.listMovieReducer
  );

  let phimDangChieu: Movie[] = [];
  let phimSapChieu: Movie[] = [];

  if (data && data.length > 0) {
    phimDangChieu = data.filter((movie) => movie.dangChieu === true);
    phimSapChieu = data.filter((movie) => movie.sapChieu === true && movie.dangChieu === false);
  }

  const renderUIMovie = (data: Movie[]) => {
    return data.map((movie) => (
      <MovieComponent key={movie.maPhim} movie={movie} />
    ));
  };

  // eslint-disable-next-line
  useEffect(() => {
    dispatch(actFetchListData());
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center loader">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container" id="listMovie">
      <h3>Phim đang chiếu</h3>
      <div className="row">{renderUIMovie(phimDangChieu)}</div>
      <h3>Phim sắp chiếu</h3>
      <div className="row">{renderUIMovie(phimSapChieu)}</div>
    </div>
  );
}
