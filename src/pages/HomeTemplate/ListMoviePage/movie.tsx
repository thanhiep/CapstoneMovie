import { Movie } from "./duck/type";
import { Link } from "react-router-dom";
import "./style.css";

type Props = {
  movie: Movie;
};

export default function MovieComponent(props: Props) {
  const { movie } = props;
  return (
    <div className="col-md-3 movieCard">
      <div className="card">
        <img src={movie.hinhAnh} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{movie.tenPhim}</h5>
          <Link
            to={`/movie-detail/${movie.maPhim}`}
            className="btn btnDetail"
          >
            Đặt vé
          </Link>
        </div>
      </div>
    </div>
  );
}
