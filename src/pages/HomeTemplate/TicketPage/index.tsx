import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { RootState } from "../../../store";
import { useEffect, useState } from "react";
import { actFetchSeatData, actFetchTicketData } from "./duck/actions";
import "./style.css";
import "./../_components/css/loader.css";
import { CHON_VE, RESET_GHE_DANG_CHON} from "./duck/constants";
import { DanhSachGhe, ThongTinVe } from "./duck/type";

export default function TicketPage() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch: any = useDispatch();
  const {
    loading,
    data: seatData,
  } = useSelector((state: RootState) => state.seatReducer);

  const { danhSachGheDangChon } = useSelector(
    (state: RootState) => state.datVeReducer
  );

  // eslint-disable-next-line
  useEffect(() => {
    if (id) {
      dispatch(actFetchSeatData(id));
    }
  }, [id]);

  const { data: userData } = useSelector(
    (state: RootState) => state.userReducer
  );
  if (!userData) {
    return <Navigate to={"/auth/login"} />;
  }

  const thongTinPhim = seatData?.thongTinPhim;
  const danhSachGhe = seatData?.danhSachGhe;

  const renderUIDetailMovie = () => {
    if (seatData) {
      return (
        <div className="thongTinPhim">
          <h3 className="titlePhim">{thongTinPhim?.tenPhim}</h3>
          <div className="row thongTinRap">
            <div className="col-md-8">
              <p>
                <span>Cụm rạp:</span> {thongTinPhim?.tenCumRap}
              </p>
              <p>
                <span>Địa chỉ:</span> {thongTinPhim?.diaChi}
              </p>
            </div>
            <div className="col-md-4">
              <p>
                <span>Rạp:</span> {thongTinPhim?.tenRap}
              </p>
              <p>
                <span>Suất chiếu:</span> {thongTinPhim?.ngayChieu} -
                {thongTinPhim?.gioChieu}
              </p>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderUISeat = () => {
    if (seatData) {
      return danhSachGhe?.map((ghe, index) => {
        const clasGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
        const classGheDaDat = ghe.daDat ? "gheDaDat ghe" : "ghe";
        let classGheDangChon = "";

        const indexGheDangChon = danhSachGheDangChon.findIndex(
          (gheDangChon: DanhSachGhe) => gheDangChon.maGhe === ghe.maGhe
        );
        if (indexGheDangChon !== -1) {
          classGheDangChon = "gheDangChon";
        }

        return (
          <span key={index}>
            <button
              key={ghe.maGhe}
              className={`${clasGheVip} ${classGheDaDat} ${classGheDangChon}`}
              onClick={() => {
                dispatch({
                  type: CHON_VE,
                  payload: ghe,
                });
              }}
            >
              {ghe.tenGhe}
            </button>
            {(index + 1) % 16 === 0 ? <br /> : ""}
          </span>
        );
      });
    }
  };

  const renderTicketTable = () => {
    return danhSachGheDangChon.map((gheDangChon: DanhSachGhe) => {
      return (
        <tr key={gheDangChon.maGhe} style={{ textAlign: "center" }}>
          <td>{gheDangChon.tenGhe}</td>
          <td>{gheDangChon.loaiGhe === "Vip" ? "Vip" : "Thường"}</td>
          <td>{gheDangChon.giaVe.toLocaleString()}</td>
        </tr>
      );
    });
  };

  const handleDatVe = () => {
    const thongTinVe: ThongTinVe = {
      maLichChieu: id,
      danhSachVe: danhSachGheDangChon,
    };

    dispatch(actFetchTicketData(thongTinVe));
   
    setIsModalOpen(true);
  };

  const resetDanhSachGheDangChon = () => {
    dispatch({
      type: RESET_GHE_DANG_CHON,
    })
  }

  const closeModal = () => {
    setIsModalOpen(false);
    if(danhSachGheDangChon.length > 0){
      window.location.reload()
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center loader">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container thongTinDatVe">
      {renderUIDetailMovie()}
      <div className="row danhSachGhe">
        <div className="col-md-8">
          <div className="screen"></div>
          <div className="styleDanhSachGhe">{renderUISeat()}</div>
          <div className="row styleGhe mx-auto">
            <div className="col-md-3 d-flex styleLoaiGhe">
              <div style={{ display: "inline-block" }} className="ghe"></div>
              <p>Ghế Thường</p>
            </div>
            <div className="col-md-3 d-flex styleLoaiGhe">
              <div
                style={{ display: "inline-block" }}
                className="ghe gheVip"
              ></div>
              <p>Ghế Vip</p>
            </div>
            <div className="col-md-3 d-flex styleLoaiGhe">
              <div
                style={{ display: "inline-block" }}
                className="gheDangChon ghe"
              ></div>
              <p>Ghế đang chọn</p>
            </div>
            <div className="col-md-3 d-flex styleLoaiGhe">
              <div
                style={{ display: "inline-block" }}
                className="gheDaDat ghe"
              ></div>
              <p>Ghế đã đặt</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 datVe">
          <h4>Thông tin đặt vé</h4>
          <p>Email: {userData.email}</p>
          <p>Điện thoại: {userData.soDT}</p>
          <table className="table table-bordered">
            <thead>
              <tr style={{ textAlign: "center" }}>
                <td>Ghế</td>
                <td>Loại</td>
                <td>Giá (VNĐ)</td>
              </tr>
            </thead>
            <tbody>{renderTicketTable()}</tbody>
            <tfoot>
              <tr style={{ textAlign: "center" }}>
                <td>Tổng tiền</td>
                <td colSpan={2}>
                  {danhSachGheDangChon
                    .reduce(
                      (tongTien: number, ghe: DanhSachGhe) =>
                        (tongTien += ghe.giaVe),
                      0
                    )
                    .toLocaleString()}{" "}
                  VNĐ
                </td>
              </tr>
            </tfoot>
          </table>
          <button className="btn btnDatVe" onClick={handleDatVe}>
            Đặt vé
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{danhSachGheDangChon.length > 0
                    ? "Đặt vé thành công"
                    : "Đặt vé thất bại"}</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                >
                    <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  {danhSachGheDangChon.length > 0
                    ? "Bạn đã đặt vé thành công"
                    : "Vui lòng chọn ghế ngồi"}
                </p>
              </div>
              <div className="modal-footer">
                {danhSachGheDangChon.length > 0 ? ( <Link onClick={resetDanhSachGheDangChon} to={"/list-movie"} className="btn btnInfoTicket">
                  Xem phim khác
                </Link>) : (<button className="btn btnInfoTicket" onClick={closeModal}>Chọn ghế ngồi</button>)}
               
                <Link onClick={resetDanhSachGheDangChon} to={"/"} className="btn btnBackToHome">
                  Về trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
