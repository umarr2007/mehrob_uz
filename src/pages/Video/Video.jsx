// import React, { useEffect, useState } from "react";
// import "./video.css";
// import axios from "axios";
// import { Tabs, Spin } from "antd";
// import { useNavigate } from "react-router-dom";

// function Video() {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [activeTab, setActiveTab] = useState(null);
//   const [video, setVideo] = useState([]);

//   const getImageUrl = (uuid) =>
//     uuid ? `https://sofft.uz/api/v1/references/download/${uuid}` : "";

//   useEffect(() => {
//     axios
//       .get("https://sofft.uz/api/v1/client/media-categories/list/VIDEO")
//       .then((res) => {
//         const data = res?.data || [];
//         setCategories(data);
//         if (data.length > 0) {
//           setActiveTab(String(data[0].id));
//         }
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     axios
//       .post("https://sofft.uz/api/v1/client/videos/pageable", {
//         perPage: 9,
//         sort: { name: "createdAt", direction: "desc" },
//         search: [
//           {
//             key: "category.id",
//             operation: "=",
//             value: Number(activeTab),
//             type: "NUMBER",
//           },
//         ],
//       })
//       .then((res) => {
//         setVideo(res?.data?.data || []);
//       })
//       .catch((err) => console.log(err));
//   }, [activeTab]);

//   return (
//     <div className="container">
//       <Tabs
//         activeKey={activeTab}
//         onChange={(key) => setActiveTab(key)}
//         items={categories?.map((item) => ({
//           label: item?.name?.uz,
//           key: String(item?.id),
//         }))}
//       />
//       <div className="video_wrapper">
//         {video.map((i) => (
//           <div
//             onClick={() => navigate(`/video/${i.id}`)}
//             className="video"
//             key={i.id}
//           >
//             <img
//               className="blog_img"
//               src={getImageUrl(i?.photo?.uuid)}
//               alt="tashrif"
//             />
//             <div className="play_icon">▶</div>

//             <h3>{i?.title?.uz}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// export default Video;

import React, { useEffect, useState } from "react";
import "./video.css";
import axios from "axios";
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";

function Video() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [video, setVideo] = useState([]);

  const getImageUrl = (uuid) =>
    uuid ? `https://sofft.uz/api/v1/references/download/${uuid}` : "";

  useEffect(() => {
    axios
      .get("https://sofft.uz/api/v1/client/media-categories/list/VIDEO")
      .then((res) => {
        const data = res?.data || [];
        setCategories(data);
        if (data.length > 0) {
          setActiveTab(String(data[0].id));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!activeTab) return;

    axios
      .post("https://sofft.uz/api/v1/client/videos/pageable", {
        page: 0,
        perPage: 9,
        sort: { name: "createdAt", direction: "desc" },
        search: [
          {
            key: "category.id",
            operation: "=",
            value: Number(activeTab),
            type: "NUMBER",
          },
        ],
      })
      .then((res) => {
        setVideo(res?.data?.data || []);
      })
      .catch((err) => console.log(err));
  }, [activeTab]);

  return (
    <div className="container video_page">
      <Tabs
        className="video_tabs"
        // tabPlacement="left"
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        items={categories.map((item) => ({
          label: item?.name?.uz,
          key: String(item?.id),
        }))}
      />
      <div className="video_wrapper">
        {video.map((i) => (
          <div
            onClick={() => navigate(`/video/${i.id}`)}
            className="video"
            key={i.id}
          >
            <div className="video_img_box">
              <img
                className="video_img"
                src={getImageUrl(i?.photo?.uuid)}
                alt="video"
              />
              <div className="play_icon">▶</div>
            </div>
            <h3>{i?.title?.uz}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Video;
