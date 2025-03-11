/* eslint-disable @next/next/no-img-element */
import "../styles/Home.scss";
import logo from "../../public/logo.png";
import Form from "@/components/Form";

const Home = async () => {
  return (
    <div className="wrapper">
      <div className="title">
        <img src={logo.src} alt="Logo" />
        <h1>لینکو: کوتاه‌کننده لینک</h1>
        <p>به راحتی لینک‌های طولانی‌تون رو قیچی کنین و به اشتراک بذارین!</p>
      </div>
      <Form />
    </div>
  );
};

export default Home;
