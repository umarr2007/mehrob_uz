// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Spin } from "antd";
// import { useNavigate } from "react-router-dom";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// function BlogsImages() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const getImageUrl = (uuid) =>
//     uuid ? `https://sofft.uz/api/v1/references/download/${uuid}` : "";

//   useEffect(() => {
//     setLoading(true);

//     axios
//       .post("https://sofft.uz/api/v1/client/blogs/pageable", {
//         page: 0,
//         perPage: 20,
//         sort: { name: "createdAt", direction: "desc" },
//       })
//       .then((res) => setBlogs(res?.data?.data || []))
//       .catch((err) => {
//         console.error(err);
//         setBlogs([]);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "50px" }}>
//         <Spin size="large" />
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 3000 }}
//         loop={true}
//         spaceBetween={20}
//         slidesPerView={1}
//         style={{ width: "70%", height: "500px" }}
//       >
//         {blogs.map((item) => (
//           <SwiperSlide key={item.id}>
//             <div
//               onClick={() => navigate(`/blog/${item.id}`)}
//               style={{
//                 width: "100%",
//                 height: "500px",
//                 cursor: "pointer",
//               }}
//             >
//               <img
//                 src={getImageUrl(item?.photo?.uuid)}
//                 alt={item?.name?.uz}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                   borderRadius: "12px",
//                 }}
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

// export default BlogsImages;

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
      .catch((err) => {
        console.log(err);
        setBlogs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {blogs.map((item) => (
        <SwiperSlide key={item.id}>
          <div
            onClick={() => navigate(`/blog/${item.id}`)}
            style={{
              width: "100%",
              height: "250px",
              borderRadius: "12px",
              overflow: "hidden",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <img
              src={getImageUrl(item?.photo?.uuid)}
              alt={item?.name?.uz}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "100%",
                padding: "10px",
                background: "rgba(0,0,0,0.6)",
                color: "white",
                fontSize: "14px",
              }}
            >
              {item?.name?.uz}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
