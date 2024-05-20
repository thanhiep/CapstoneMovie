import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row footerInfo">
          <div className="col-md-7">
            <h4>CyberMovie</h4>
            <p>Địa chỉ: 112 Cao Thắng, Quận 3, TP.Hồ Chí Minh</p>
            <p>Điện thoại: 096.105.1014</p>
            <p>Email: cybermovie@gmail.com</p>
          </div>
          <div className="col-md-5 social">
            <Link to={"/"}>
              <FontAwesomeIcon className="iconSocial" icon={faFacebookF} />
            </Link>
            <Link to={"/"}>
              <FontAwesomeIcon className="iconSocial" icon={faInstagram} />
            </Link>
            <Link to={"/"}>
              <FontAwesomeIcon className="iconSocial" icon={faYoutube} />
            </Link>
            <Link to={"/"}>
              <FontAwesomeIcon className="iconSocial" icon={faTwitter} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
