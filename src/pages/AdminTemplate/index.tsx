import { Navigate, Outlet } from "react-router-dom";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function AdminTemplate() {
  const { data } = useSelector((state: RootState) => state.userReducer);
  if(!data){
    return <Navigate to={"/auth/login"} />
  } else if (data.maLoaiNguoiDung !== "QuanTri"){
    return <Navigate to={"/"}/>
  }
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
