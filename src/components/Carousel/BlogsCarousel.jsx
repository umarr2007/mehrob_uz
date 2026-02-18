import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./blogswwiper.css";

export default function BlogsImages() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getImageUrl = (uuid) =>
    uuid ? `https://sofft.uz/api/v1/references/download/${uuid}` : "";

  useEffect(() => {
    setLoading(true);

    axios
      .post("https://sofft.uz/api/v1/client/blogs/pageable", {
        page: 0,
        perPage: 20,
        sort: { name: "createdAt", direction: "desc" },
      })
      .then((res) => setBlogs(res?.data?.data || []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="blogs_loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="blogs_wrapper">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1 },
          576: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
        }}
      >
        {blogs.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              onClick={() => navigate(`/blog/${item.id}`)}
              className="blogs_card"
            >
              <img
                src={getImageUrl(item?.photo?.uuid)}
                alt={item?.name?.uz}
                className="blogs_img"
              />

              <div className="blogs_overlay">
                <p className="blogs_swiper_title">{item?.name?.uz}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
