import { NavLink } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { actFetchUserLogin } from "../../../AuthenPage/login/duck/actions";
import { useEffect } from "react";

export default function Header() {
  const { data } = useSelector((state: RootState) => state.userReducer);
  const dispatch:any = useDispatch()

  useEffect(()=>{},[])

  const renderUILogin = () => {
    if (data)
      return (
        <>
          <li className="nav-item">
            <span className="nav-link">{data.taiKhoan} |</span>
          </li>
          <li className="nav-item">
            <button
              className="nav-link btn btnLogout"
              onClick={() => {
                localStorage.removeItem("user")
                dispatch(actFetchUserLogin({taiKhoan:"",matKhau:""}))
              }}
            >
              Đăng xuất
            </button>
          </li>
        </>
      );
    return (
      <>
       <li className="nav-item">
        <NavLink to="/auth/login" className="nav-link navLogin btn">
          Đăng nhập
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/auth/signup" className="nav-link btn">
          Đăng ký
        </NavLink>
      </li>
      </>
     
    );
  };

  return (
    <div className="homeHeader">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Cyber Movie
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link my-active" : "nav-link"
                  }
                  to="/"
                >
                  Trang chủ
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link my-active" : "nav-link"
                  }
                  to="/list-movie"
                >
                  Danh sách phim
                </NavLink>
              </li>

              {renderUILogin()}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
