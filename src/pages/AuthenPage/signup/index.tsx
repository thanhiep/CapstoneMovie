import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchUserSignup } from "./duck/actions";
import { RootState } from "../../../store";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./../../HomeTemplate/_components/css/form.css";
import "./../../HomeTemplate/DetailMovie/style.css";

const alphaNumericRegex = /^[a-zA-Z0-9]+$/;
const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
const vietnameseAlphaRegex =
  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưỰỰỮụủạảấầẩẫậắằẳẵặẹẻẽềếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỹÝỶỸỴýỳỷỹỵ ]+$/;

const schema = yup.object({
  taiKhoan: yup
    .string()
    .required("(*) Vui lòng nhập tài khoản")
    .matches(alphaNumericRegex, "(*) Tài khoản chỉ được nhập chữ và số")
    .min(4, "(*) Tài khoản phải có ít nhất 4 kí tự"),
  matKhau: yup
    .string()
    .required("(*) Vui lòng nhập mật khẩu")
    .min(8, "(*) Mật khẩu phải có ít nhất 8 kí tự"),
  email: yup
    .string()
    .required("(*) Vui lòng nhập email")
    .email("(*) Email không đúng định dạng"),
  soDt: yup
    .string()
    .required("(*) Vui lòng nhập số điện thoại")
    .matches(phoneRegex, "(*) Số điện thoại không đúng định dạng"),
  hoTen: yup
    .string()
    .required("(*) Vui lòng nhập họ tên")
    .matches(vietnameseAlphaRegex, "(*) Họ tên chỉ được nhập chữ"),
});

export default function SignupPage() {
  const { data: userLogin } = useSelector(
    (state: RootState) => state.userReducer
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch: any = useDispatch();
  const { loading, data: userSignup } = useSelector(
    (state: RootState) => state.userSignupReducer
  );

  const { handleSubmit, register, formState } = useForm<any>({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      hoTen: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (formValues: any) => {
    dispatch(actFetchUserSignup(formValues));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (userLogin) {
    if (userLogin.maLoaiNguoiDung === "QuanTri") {
      return <Navigate to={"/admin/dashboard"} />;
    }
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container loginForm">
      <h4 className="loginTitle">Đăng ký</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="hoTen">Họ tên</label>
          <input
            type="text"
            className="form-control"
            id="hoTen"
            placeholder="Nguyen Van A"
            {...register("hoTen")}
          />
          <span className="text text-danger">
            {formState.errors.hoTen?.message as any}
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="taiKhoan">Tài khoản</label>
          <input
            type="text"
            className="form-control"
            id="taiKhoan"
            placeholder="hellocybermovie"
            {...register("taiKhoan")}
          />
          <span className="text text-danger">
            {formState.errors.taiKhoan?.message as any}
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="matKhau">Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            id="matKhau"
            placeholder="******"
            {...register("matKhau")}
          />
          <span className="text text-danger">
            {formState.errors.matKhau?.message as any}
          </span>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="hellocybermovie@gmail.com"
                {...register("email")}
              />
              <span className="text text-danger">
                {formState.errors.email?.message as any}
              </span>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="soDt">Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                id="soDt"
                placeholder="0901234567"
                {...register("soDt")}
              />
              <span className="text text-danger">
                {formState.errors.soDt?.message as any}
              </span>
            </div>
          </div>
        </div>

        <button disabled={loading} type="submit" className="btn btnLogin">
          Đăng ký
        </button>
        <div>
          <p style={{ textAlign: "center" }}>
            Bạn đã có tài khoản?
            <span>
              <Link to={"/auth/login"}>Đăng nhập</Link>
            </span>
          </p>
          <p style={{ textAlign: "center" }}>
            <Link to={"/"}>Quay về trang chủ</Link>
          </p>
        </div>

        {loading && (
          <div
            style={{ textAlign: "center" }}
            className="spinner-border"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </form>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {userSignup
                    ? "Đăng ký thành công"
                    : "Đăng ký không thành công"}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                >
                  <Link to={"/"}>
                    <span aria-hidden="true">×</span>
                  </Link>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  {userSignup
                    ? "Bạn đã đăng ký thành công"
                    : "Đã có lỗi xảy ra, vui lòng thử lại"}
                </p>
              </div>
              <div className="modal-footer">
                <Link to={"/auth/login"} className="btn btnAuthLogin">
                  Đăng nhập
                </Link>
                <Link to={"/"} className="btn btnBackToHome">
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
