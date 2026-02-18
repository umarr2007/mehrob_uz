import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Tabs } from "antd";
import "./videoId.css";

function VideoId() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  const getImageUrl = (uuid) =>
    uuid ? `https://sofft.uz/api/v1/references/download/${uuid}` : "";

  useEffect(() => {
    axios
      .get(`https://sofft.uz/api/v1/client/videos/${id}`)
      .then((res) => {
        const data = res?.data?.data;
        setVideo(data);

        if (data?.category?.id) {
          setActiveTab(String(data.category.id));
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    axios
      .get("https://sofft.uz/api/v1/client/media-categories/list/VIDEO")
      .then((res) => {
        setCategories(res?.data || []);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!activeTab) return;

    axios
      .post("https://sofft.uz/api/v1/client/videos/pageable", {
        page: 0,
        perPage: 6,
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
        setRelatedVideos(res?.data?.data || []);
      })
      .catch((err) => console.log(err));
  }, [activeTab]);

  const getYoutubeId = (url) => {
    const regExp = /v=([^&]+)/;
    const match = url?.match(regExp);
    return match ? match[1] : "";
  };

  if (!video) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="container video_id_page">
      <div className="video_sidebar">
        <Tabs
          tabPosition="left"
          className="video_tabs"

          activeKey={activeTab}
          onChange={(key) => {
            setActiveTab(key);
          }}
          items={categories.map((item) => ({
            label: item?.name?.uz,
            key: String(item?.id),
          }))}
        />
      </div>

      <div className="video_id_main">
        <div className="video_player">
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${getYoutubeId(video?.url)}`}
            frameBorder="0"
            allowFullScreen
            title="video"
          ></iframe>
        </div>

        <h3 className="related_title">
          {categories.find((c) => String(c.id) === activeTab)?.name?.uz}
        </h3>

        <div className="video_wrapper">
          {relatedVideos.map((item) => (
            <div
              className="video"
              key={item.id}
              onClick={() => navigate(`/video/${item.id}`)}
            >
              <img
                className="video_img"
                src={getImageUrl(item?.photo?.uuid)}
                alt="video"
              />
              <h4 className="video_name">{item?.title?.uz}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoId;
