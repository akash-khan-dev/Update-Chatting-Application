import React from "react";
import "./style.css";
import avatar from "../../images/pngwing.com(1).png";
import { AiOutlineHome } from "react-icons/ai";
import { BiMessageRoundedDots } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsFillGearFill } from "react-icons/bs";
import { AiOutlineLogin } from "react-icons/ai";

export const Sidebar = () => {
  return (
    <>
      <div className="side-bar">
        <div className="Profile-img">
          <picture>
            <img src={avatar} alt="" />
          </picture>
        </div>
        <div className="menubar-icon">
          <div className="home-icon menu-icon">
            <AiOutlineHome />
          </div>
          <div className="message-icon menu-icon">
            <BiMessageRoundedDots />
          </div>
          <div className="colling-icon menu-icon">
            <IoMdNotificationsOutline />
          </div>
          <div className="satting-icon menu-icon">
            <BsFillGearFill />
          </div>
        </div>
        <div className="logout-icon">
          <AiOutlineLogin />
        </div>
      </div>
    </>
  );
};
