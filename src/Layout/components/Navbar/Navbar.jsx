import React from "react";
import { Layout } from "antd";
import "./navbar.css";
import dayjs from "dayjs";
import "dayjs/locale/uz-latn";
const { Header: AntHeader } = Layout;
import {
  InstagramOutlined,
  MenuOutlined,
  FacebookOutlined,
  YoutubeOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { FaTelegram } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import { MENU, RIGHT_MENU } from "../../../config/MenuItem";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { useState, useEffect } from "react";
dayjs.locale("uz-latn");
import { useNavigate } from "react-router-dom";
function Navbar() {
  const date = dayjs().format("YYYY [yil] DD MMMM, dddd");
  const navigate = useNavigate();
  return (
    <AntHeader >
      <div className="container">
      <div className="all_wrapper">
        <div className="all_left">
          <div onClick={() => navigate("/")} className="header_logo">
            <img src="/logo.png" alt="logo" />
          </div>

          <div className="header_logo_text">
            <h1 className="header_title">Mehrob.uz</h1>
            <p className="header_text">
              Shayx Sayyid Rahmatulloh <br /> Termiziyning shaxsiy veb sahifasi
            </p>
          </div>
        </div>
        <div className="all_right">
          <div className="header_social_wrapper">
            <div className="header_social">
              <div className="left_date">
                <p className="header_date">{date} </p>{" "}
              </div>

              <div className="right_icons">
                <InstagramOutlined
                  onClick={() =>
                    window.open("https://www.instagram.com/mehrob.uz/")
                  }
                  className="icon"
                />
                <FacebookOutlined
                  onClick={() =>
                    window.open("https://www.facebook.com/Mehrob.uz2")
                  }
                  className="icon"
                />
                <YoutubeOutlined
                  onClick={() =>
                    window.open("https://www.youtube.com/c/MehrobUz")
                  }
                  className="icon"
                />
                <FaTelegram
                  onClick={() => window.open("https://t.me/mehrob_uz")}
                  className="icon"
                />
              </div>
            </div>
          </div>

          <div className="navbar_link_wrapper">
            <div>
              <p className="date_responsive">{date}</p>
            </div>

            {MENU.map((item, index) =>
              item.children ? (
                <Dropdown menuWidth={160} key={index} items={item.children}>
                  <span className="navbar_link">
                    {item.label} <DownOutlined style={{ fontSize: 15 }} />
                  </span>
                </Dropdown>
              ) : (
                <div key={index} className="navbar_link">
                  {item.label}
                </div>
              )
            )}

            <div className="link_right">
              {RIGHT_MENU.map((item) => (
                <Dropdown
                  key={item.key}
                  items={item.items}
                  menuWidth={item.width}
                  trigger={[item.trigger]}
                  icon={item.icon}
                >
                  {item.icon === "language" ? (
                    <MdLanguage className="header_icon" />
                  ) : (
                    <AiOutlineMenu className="header_icon" />
                  )}
                </Dropdown>
              ))}
            </div>
          </div>
        </div>
      </div>

      </div>

    </AntHeader>
  );
}
export default Navbar;