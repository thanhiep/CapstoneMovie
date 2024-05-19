import { Link, useParams } from "react-router-dom";
import { actFetchDetailMovie } from "./duck/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import dayjs from "dayjs";
import LichChieu from "./lichChieu";
import "./style.css";

export default function DetailMovie() {
  const { id } = useParams();
  const dispatch: any = useDispatch();
  const { loading, data } = useSelector(
    (state: RootState) => state.movieDetailReducer
  );

  useEffect(() => {
    if (id) {
      dispatch(actFetchDetailMovie(id));
    }
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [id]);

  const renderMovieDetail = () => {
    if (data) {
      const date = new Date(data.ngayKhoiChieu);
      return (
        <div className="row">
          <div className="col-md-3">
            <img
              src={data.hinhAnh}
              className="w-100 rounded"
              height={300}
              alt={data.tenPhim}
            />
          </div>
          <div className="col-md-9">
            <h4 className="movieTitle">{data.tenPhim}</h4>
            <p>Mô tả: {data.moTa}</p>
            <p>Ngày khởi chiếu: {dayjs(date).format("DD/MM/YYYY - hh:mm A")}</p>
            <p>Đánh giá: {data.danhGia}/10</p>
            <Link to={data.trailer} target="_blank" className="btn btnTrailer">
              Xem trailer
            </Link>
          </div>
        </div>
      );
    }
  };

  const renderLichChieu = () => {
    if (data) {
      return <LichChieu movieDetail={data} />;
    }
  };

  if (loading)
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );

  return (
    <div className="container detailMovie">
      <h3 className="title">Thông tin phim</h3>
      {renderMovieDetail()}
      <h3 className="title">Lịch chiếu phim</h3>
      {renderLichChieu()}
    </div>
  );
}
