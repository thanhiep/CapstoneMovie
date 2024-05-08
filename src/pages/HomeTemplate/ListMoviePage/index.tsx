import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchListData } from "./duck/actions";
import { RootState } from "../../../store";
import "./style.css";
import MovieComponent from "./movie";

export default function ListMoviePage() {
  const dispatch: any = useDispatch();
  // const loading = useSelector(
  //   (state: RootState) => state.listMovieReducer.loading
  // );
  // const data = useSelector((state: RootState) => state.listMovieReducer.data);

  const { loading, data } = useSelector(
    (state: RootState) => state.listMovieReducer
  );

  const renderListMovie = () => {
    if (loading) return <div>Loading...</div>;
    if (data && data.length > 0) {
      return data.map((movie) => <MovieComponent key={movie.maPhim} movie = {movie} />);
    }
  };

  useEffect(() => {
    dispatch(actFetchListData());
  }, []);

  return (
    <div className="container">
      <h3>List Movie Page</h3>
      <div className="row">{renderListMovie()}</div>
    </div>
  );
}
