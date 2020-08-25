import React from "react";
import { Link } from "react-router-dom";
import { history } from "./../../routers/AppRouter";
import { AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import TopMenuItem from "./TopMenuItem";

const Header = (props) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };
  return (
    <div className="w-full bg-gray-800">
      <div className="container mx-auto">
        <div className="flex justify-between items-center font-semibold text-white">
          <div className="mr-5">
            <img
              alt="Int Blog"
              src={require("./../../assets/img/logo-white.png")}
              style={{ maxWidth: "250px" }}
              className="py-2"
            />
          </div>
          <div className="flex items-center justify-center flex-1">
            <TopMenuItem url="/dashboard" title="Anasayfa" />
            <TopMenuItem url="/users" title="Kullanıcılar" />
            <TopMenuItem url="/news-categories" title="Yazılar" />
            <TopMenuItem url="/page-categories" title="Sayfalar" />
          </div>
          <div className="text-right flex">
            <Link to="/settings" className="mr-4">
              <AiOutlineSetting className="text-2xl" />
            </Link>

            <span className="cursor-pointer" onClick={handleLogout}>
              <AiOutlineLogout className="text-2xl" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
