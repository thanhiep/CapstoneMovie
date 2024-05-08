import "./style.css";
import { useMagicColor } from "./useMagicColor";

export default function Circle() {
  return (
    <div>
      Circle
      <div
        className="circle"
        style={{ backgroundColor: useMagicColor() }}
      ></div>
    </div>
  );
}
