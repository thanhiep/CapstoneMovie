import { Button } from "react-bootstrap";
import { MovieDetail } from "./duck/types";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

type Props = {
  movieDetail: MovieDetail;
};

export default function LichChieu(props: Props) {
  const { movieDetail } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useSelector((state: RootState) => state.userReducer);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tab.Container id="left-tabs-example">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {movieDetail.heThongRapChieu.map((item) => {
                return (
                  <Nav.Item key={item.maHeThongRap}>
                    <Nav.Link eventKey={item.maHeThongRap}>
                      <img
                        src={item.logo}
                        alt={item.tenHeThongRap}
                        style={{ width: 120, height: 120 }}
                      />
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              {movieDetail.heThongRapChieu.map((system) => {
                return (
                  <Tab.Pane
                    key={system.maHeThongRap}
                    eventKey={system.maHeThongRap}
                  >
                    <h3 className="tenRap">{system.tenHeThongRap}</h3>
                    {system.cumRapChieu.map((item) => {
                      return (
                        <div key={item.maCumRap}>
                          <h5 className="tenCum">{item.tenCumRap}</h5>
                          <Row style={{ paddingBottom: "10px" }}>
                            {item.lichChieuPhim.map((item, index) => {
                              return (
                                <Col key={item.maLichChieu} sm={2}>
                                  <Button
                                    className="btnLichChieu"
                                    key={`lich-chieu-${index}`}
                                    onClick={()=>{
                                      data ? navigate(`/ticket/${item.maLichChieu}`) : setIsModalOpen(true)
                                    }}
                                  >
                                    {dayjs(item.ngayChieuGioChieu).format(
                                      "DD/MM-hh:mm"
                                    )}
                                  </Button>
                                </Col>
                              );
                            })}
                          </Row>
                        </div>
                      );
                    })}
                  </Tab.Pane>
                );
              })}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Đăng nhập để tiếp tục</h5>
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
                <p>Bạn cần đăng nhập để tiếp tục đặt vé</p>
              </div>
              <div className="modal-footer">
                <Link to={"/auth/login"} className="btn btnAuthLogin">
                  Đăng nhập
                </Link>
                <Link to={"/auth/signup"} className="btn btnAuthSignup">
                  Đăng ký
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
