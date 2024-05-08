import { useParams } from "react-router-dom";
import { actFetchDetailMovie } from "./duck/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import dayjs from "dayjs";
import LichChieu from "./lichChieu";

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
  }, [id]);

  const renderMovieDetail = () => {
    if (loading) return <div>Loading...</div>;
    if (data) {
      const date = new Date(data.ngayKhoiChieu);
      return (
        <div className="row py-5">
          <div className="col-md-3">
            <img
              src={data.hinhAnh}
              className="w-100 rounded"
              height={400}
              alt={data.tenPhim}
            />
          </div>
          <div className="col-md-9">
            <h4>{data.tenPhim}</h4>
            <p>Mô tả: {data.moTa}</p>
            <p>Ngày khởi chiếu: {dayjs(date).format("DD/MM/YYYY - hh:mm A")}</p>
            <p>Đánh giá: {data.danhGia}/10</p>
            <button className="btn btn-success">Xem trailer</button>
          </div>
        </div>
      );
    }
  };

  const renderLichChieu = () => {
    if(loading) return <div>Loading...</div>
    if(data){
      return <LichChieu movieDetail = {data}/>
    }
  }

  return (
    <div className="container">
      {renderMovieDetail()}
     {renderLichChieu()}
    </div>
  );
}
