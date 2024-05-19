export type ThongTinDatVe = {
  thongTinPhim: ThongTinPhim;
  danhSachGhe: DanhSachGhe[];
};

export type DanhSachGhe = {
  maGhe: number;
  tenGhe: string;
  maRap: number;
  loaiGhe: LoaiGhe;
  stt: string;
  giaVe: number;
  daDat: boolean;
  taiKhoanNguoiDat: null;
};

export enum LoaiGhe {
  Thuong = "Thuong",
  Vip = "Vip",
}

export type ThongTinPhim = {
  maLichChieu: number;
  tenCumRap: string;
  tenRap: string;
  diaChi: string;
  tenPhim: string;
  hinhAnh: string;
  ngayChieu: string;
  gioChieu: string;
};

export type ThongTinVe = {
  maLichChieu: string | undefined;
  danhSachVe:  DanhSachVe[];
}

export type DanhSachVe = {
  maGhe: number;
  giaVe: number;
}