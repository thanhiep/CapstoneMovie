import { Button } from "react-bootstrap";
import { MovieDetail } from "./duck/types";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import dayjs from "dayjs";

type Props = {
  movieDetail: MovieDetail;
};

export default function LichChieu(props: Props) {
  const { movieDetail } = props;
  return (
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
                    style={{width:120, height:120}}
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
                <Tab.Pane eventKey={system.maHeThongRap}>
                {system.cumRapChieu.map((item) => {
                  return (
                    <div>
                      {item.tenCumRap}
                      <Row>
                        {item.lichChieuPhim.map((item, index) => {
                          return (
                            <Col sm={2}>
                              <Button
                                variant="primary"
                                key={`lich-chieu-${index}`}
                              >
                                {dayjs(item.ngayChieuGioChieu).format(
                                  "DD/MM hh:mm"
                                )}
                              </Button>
                            </Col>
                          );
                        })}
                      </Row>
                    </div>
                  );
                })}
                {system.tenHeThongRap}
              </Tab.Pane>
              );
            })}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}
