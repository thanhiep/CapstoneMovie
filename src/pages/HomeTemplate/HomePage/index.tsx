import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useEffect } from "react";
import { actFetchBannerData } from "./duck/actions";
import "./style.css";
import { Carousel } from "react-bootstrap";
import MovieComponent from "../ListMoviePage/movie";
import { actFetchListData } from "../ListMoviePage/duck/actions";
import { Link } from "react-router-dom";
import "./../_components/css/loader.css";

export default function HomePage() {
  const dispatch: any = useDispatch();
  const {
    loading: loadingBanner,
    data: bannerData,
  } = useSelector((state: RootState) => state.bannerReducer);

  // eslint-disable
  useEffect(() => {
    dispatch(actFetchBannerData());
  },[]);

  const { data: listMovieData, loading: loadingListMovie } = useSelector(
    (state: RootState) => state.listMovieReducer
  );

  const renderMovieHome = () => {
    if (loadingListMovie)
      return (
        <div className="d-flex justify-content-center loader">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    if (listMovieData) {
      return listMovieData.map((movie, index) => {
        if (movie.hot && index < 8) {
          return <MovieComponent key={movie.maPhim} movie={movie} />;
        }
      });
    }
  };

 // eslint-disable
  useEffect(() => {
    dispatch(actFetchListData());
  },[]);

  const renderBanner = () => {
    if (loadingBanner)
      return (
        <div className="d-flex justify-content-center loader">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    if (bannerData) {
      return bannerData.map((banner) => {
        return (
          <Carousel.Item className="bannerItem">
            <img
              src={banner.hinhAnh}
              style={{ objectFit: "cover" }}
              className="w-100"
              alt="..."
            />
          </Carousel.Item>
        );
      });
    }
  };

  return (
    <div>
      <Carousel className="banner">{renderBanner()}</Carousel>
      <div className="container listPhimHot">
        <h3>Phim đang hot</h3>
        <div className="row">{renderMovieHome()}</div>
        <div className="seeMore d-flex">
          <Link to={"/list-movie"} className="btn btnSeeMore">
            Xem thêm
          </Link>
        </div>
      </div>
    </div>
  );
}
