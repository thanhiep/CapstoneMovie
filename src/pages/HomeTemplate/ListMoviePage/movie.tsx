import { Movie } from "./duck/type";
import {Link} from "react-router-dom";

type Props = {
    movie: Movie
}

export default function MovieComponent(props:Props) {
    const {movie} = props
  return (
    <div className="col-md-3">
            <div className="card">
              <img src={movie.hinhAnh} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{movie.tenPhim}</h5>
                <Link to={`/movie-detail/${movie.maPhim}`} className="btn btn-info">
                  Detail
                </Link>
              </div>
            </div>
          </div>
  )
}
