import React, { useEffect, useState } from "react";
import "./video.css";
import axios from "axios";
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";

function Video() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [videos, setVideos] = useState([]);
  const [lastActive, setLastActive] = useState(null);
  const [loadingLastActive, setLoadingLastActive] = useState(false);
  const [loadingVideos, setLoadingVideos] = useState(false);

  const getImageUrl = (uuid) =>
    uuid ? `https://sofft.uz/api/v1/references/download/${uuid}` : "";

  useEffect(() => {
    setLoadingLastActive(true);

    axios
      .get("https://sofft.uz/api/v1/client/videos/last-active")
      .then((res) => {
        setLastActive(res?.data?.data || null);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingLastActive(false));
  }, []);

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
    setLoadingVideos(true);
    axios
      .post("https://sofft.uz/api/v1/client/videos/pageable", {
        page: 0,
        perPage: 12,
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
        setVideos(res?.data?.data || []);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingVideos(false));
  }, [activeTab]);

  return (
    <div className="container video_page">
      <div className="video_sidebar">
        <Tabs
          className="video_tabs"
          tabPlacement="left"
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          items={categories.map((item) => ({
            label: item?.name?.uz,
            key: String(item?.id),
          }))}
        />
      </div>
      <div className="video_main">
        {loadingLastActive ? (
          <div className="last_active_box">
            <p className="last_active_loading">Yuklanmoqda...</p>
          </div>
        ) : (
          lastActive && (
            <div
              className="last_active_box"
              onClick={() => navigate(`/video/${lastActive?.id}`)}
            >
              <div className="last_active_img_box">
                <img
                  className="last_active_img"
                  src={getImageUrl(lastActive?.photo?.uuid)}
                  alt="last active"
                />
              </div>

              <div className="last_active_info">
                <h2 className="last_active_name">{lastActive?.title?.uz}</h2>
                <div className="last_active_bottom">
                  <span className="last_active_badge">
                    {lastActive?.category?.name?.uz}
                  </span>

                  <span className="last_active_views">
                    👁 {lastActive?.views} ta ko‘rildi
                  </span>
                </div>
              </div>
            </div>
          )
        )}

        <div className="video_wrapper">
          {loadingVideos ? (
            <p style={{ textAlign: "center" }} className="video_loading">Videolar yuklanmoqda...</p>
          ) : videos.length === 0 ? (
            <p style={{ textAlign: "center" }} className="video_empty">Bu kategoriyada video topilmadi 😕</p>
          ) : (
            videos.map((item) => (
              <div
                className="video"
                key={item?.id}
                onClick={() => navigate(`/video/${item?.id}`)}
              >
                <div className="video_img_box">
                  <img
                    className="video_img"
                    src={getImageUrl(item?.photo?.uuid)}
                    alt="video"
                  />
                  <div className="play_icon">▶</div>
                </div>

                <div className="video_content">
                  <h3 className="video_title">{item?.title?.uz}</h3>
                  <p className="video_views">👁 {item?.views} ta ko‘rildi</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default Video;