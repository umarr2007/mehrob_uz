import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./customCarousel.css";

function CarouseList() {
  const [itemsList, setItemsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getImageUrl = (uuid) =>
    uuid ? `https://sofft.uz/api/v1/references/download/${uuid}` : "";

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://sofft.uz/api/v1/client/names-of-god/list", {})
      .then((res) => setItemsList(res?.data || []))
      .catch(() => setItemsList([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="carousel_container">
      {loading ? (
        <div className="carousel_loading">
          <Spin size="large" />
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 2 },
            576: { slidesPerView: 4 },
            768: { slidesPerView: 6 },
            1200: { slidesPerView: 8 },
          }}
        >
          {itemsList.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="carousel_item"
                onClick={() => navigate(`/listid/${item.id}`)}
              >
                <img
                  src={getImageUrl(item?.photo?.uuid)}
                  alt={item?.name?.uz}
                  className="carousel_image"
                />
                <p className="carousel_title">{item?.name?.uz}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="all_btn_wrapper">
        <Button onClick={() => navigate("/lists")} style={{marginTop: "40px"}} type="primary" className="hammasi_btn">
          Hammasi
        </Button>
      </div>
    </div>
  );
}
export default CarouseList;
