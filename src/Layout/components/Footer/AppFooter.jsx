import React from "react";
import { Flex, Layout } from "antd";
import "./footer.css";
import {
  InstagramOutlined,
  MenuOutlined,
  FacebookOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { FaTelegram, FaLanguage } from "react-icons/fa";

const { Footer: AntFooter } = Layout;

function AppFooter() {
  const footerStyle = {
    color: "#fff",
    backgroundColor: "#004c44",
    padding: "20px ",
    // margintop: "20px",
  };

  // style={{ marginTop: "20px" }}

  return (
    <Flex>
      <Layout>
        <AntFooter style={footerStyle}>
          <div className="footer_wrapper">
            <div className="footer_left">
              <div className="footer_logo">
                <img className="footer_img" src="/logo.png" alt="" />
                <div>
                  <h2 className="footer_title">Mehrob.uz</h2>
                  <p className="footer_text">
                    Shayx Sayyid Rahmatulloh Termiziyning shaxsiy veb sahifasi
                  </p>
                </div>
              </div>

              <div className="footer_icons_wrapper">
                <p className="footer_description">
                  © 2017 Myehrob.uz. Barcha huquqlar himoyalangan. O'zMAA
                  intyernyet-OAV guvohnomasi raqami: 1153
                </p>

                <div className="footer_icons">
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

            <div className="footer_right">
              <div style={{ width: "100%", height: "200px" }}>
                <iframe
                  title="Minor masjidi"
                  src="https://www.google.com/maps?q=Minor+Masjidi+Toshkent&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div>
                <h2 className="footer_link">mehrob.uz@gmail.com</h2>
                <h2 className="footer_link">Du-Sha 8:00 - 18:00</h2>
                <h2 className="footer_link">
                  Toshkent shahar Yunusobod tumani Minor berk <br /> ko‘chasi,
                  1-uy.
                </h2>
              </div>

              <div className="footer_social_wrapper">
                <p className="footer_description">
                  © 2017 Myehrob.uz. Barcha huquqlar himoyalangan. O'zMAA
                  intyernyet-OAV guvohnomasi raqami: 1153
                </p>

                <div className="footer_icons">
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
          </div>
        </AntFooter>
      </Layout>
    </Flex>
  );
}

export default AppFooter;
