import "./style.css";
import { useMagicColor } from "./useMagicColor";

export default function Square() {
  return (
    <div>
      Square
      <div
        className="square"
        style={{ backgroundColor: useMagicColor() }}
      ></div>
    </div>
  );
}
