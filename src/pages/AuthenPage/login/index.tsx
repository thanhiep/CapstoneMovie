import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchUserLogin } from "./duck/actions";
import { RootState } from "../../../store";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./../../HomeTemplate/_components/css/form.css"
const schema = yup.object({
  taiKhoan: yup.string().required("(*) Vui lòng nhập tài khoản"),
  matKhau: yup.string().required("(*) Vui lòng nhập mật khẩu"),
});

export default function LoginPage() {
  const dispatch: any = useDispatch();
  const { loading, data } = useSelector(
    (state: RootState) => state.userReducer
  );
  const navigate = useNavigate();

  const { handleSubmit, register, formState } = useForm<any>({
    defaultValues: { taiKhoan: "", matKhau: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = (formValues: any) => {
    dispatch(actFetchUserLogin(formValues));
  };

  useEffect(() => {
    if (data) {
      if (data.maLoaiNguoiDung === "QuanTri") {
        return navigate("/admin/dashboard");
      }
      window.history.back();
    }
  }, [data]);

  return (
    <div className="container loginForm">
      <h4 className="loginTitle">Đăng nhập</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="taiKhoan">Tài khoản</label>
          <input
            type="text"
            className="form-control"
            id="taiKhoan"
            {...register("taiKhoan")}
          />
          <span className="text text-danger">{formState.errors.taiKhoan?.message as any}</span>
        </div>
        <div className="form-group">
          <label htmlFor="matKhau">Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            id="matKhau"
            {...register("matKhau")}
          />
          <span className="text text-danger">{formState.errors.matKhau?.message as any}</span>
        </div>
        <button disabled={loading} type="submit" className="btn btnLogin">
          Đăng nhập
        </button>
        <div>
          <p style={{textAlign:"center"}}>Bạn chưa có tài khoản? <span><Link to={"/auth/signup"}>Đăng ký</Link></span></p>
         <p style={{textAlign:"center"}}><Link to={"/"}>Quay về trang chủ</Link></p> 
        </div>
        
        {loading && (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </form>
    </div>
  );
}
