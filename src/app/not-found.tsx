import Link from "next/link";
import "../styles/Notfound.scss";
import logo from "../../public/logo.png";

const NotFound = () => {
  return (
    <div className="w404">
      <div className="a404">
        <img src={logo.src} alt="Logo" />
        <h2>۴۰۴</h2>
      </div>
      <div className="t404">
        <p>اشتباه اومدی! اینجا خبری نیست...</p>
        <Link href="/">برو صفحه اصلی</Link>
      </div>
    </div>
  );
};

export default NotFound;
