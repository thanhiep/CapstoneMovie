import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchUserLogin } from "./duck/actions";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  taiKhoan: yup.string().required("(*) Vui lòng nhập tài khoản"),
  matKhau: yup.string().required("(*) Vui lòng nhập mật khẩu"),
});

export default function AuthenPage() {
  const dispatch: any = useDispatch();
  const { loading, data, error } = useSelector(
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
      navigate("/");
    }
  }, [data]);

  return (
    <div className="container w-50">
      <h4>Đăng nhập</h4>
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
        <button disabled={loading} type="submit" className="btn btn-success">
          Đăng nhập
        </button>
        {loading && (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </form>
    </div>
  );
}
