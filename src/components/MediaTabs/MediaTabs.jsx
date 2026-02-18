import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import "./mediatabs.css";

function MediaPage() {
  const navigate = useNavigate();
  const [type, setType] = useState("VIDEO");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const getImageUrl = (uuid) =>
    uuid ? `https://sofft.uz/api/v1/references/download/${uuid}` : "";

  const getApiUrl = () => {
    if (type === "VIDEO")
      return "https://sofft.uz/api/v1/client/videos/pageable";
    if (type === "AUDIO")
      return "https://sofft.uz/api/v1/client/audios/pageable";
    if (type === "PHOTO")
      return "https://sofft.uz/api/v1/client/photos/pageable";
  };

  const getPerPage = () => (type === "PHOTO" ? 9 : 15);

  // Get categories
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://sofft.uz/api/v1/client/media-categories/list/${type}`)
      .then((res) => {
        setCategories(res.data || []);
        if (res.data.length > 0) setCategoryId(String(res.data[0].id));
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [type]);

  // Get items
  useEffect(() => {
    if (!categoryId) return;
    setLoading(true);
    axios
      .post(getApiUrl(), {
        perPage: getPerPage(),
        page: 0,
        sort: { name: "createdAt", direction: "desc" },
        search: [
          {
            key: "category.id",
            operation: "=",
            value: Number(categoryId),
            type: "NUMBER",
          },
        ],
      })
      .then((res) => setItems(res.data?.data || []))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [categoryId, type]);

  const goDetail = (id) => {
    if (type === "VIDEO") navigate(`/video/${id}`);
    if (type === "AUDIO") navigate(`/audio/${id}`);
    if (type === "PHOTO") navigate(`/rasmlar/${id}`);
  };

  return (
    <div className="media_container">
      <Tabs
        activeKey={type}
        onChange={setType}
        className="top_tabs"
        items={[
          { key: "VIDEO", label: "🎥 Video" },
          { key: "AUDIO", label: "🎧 Audio" },
          { key: "PHOTO", label: "🖼 Rasmlar" },
        ]}
      />

      <div className="category_tabs">
        <Tabs
          activeKey={categoryId}
          onChange={setCategoryId}
          items={categories.map((c) => ({
            key: String(c.id),
            label: c.name?.uz,
          }))}
        />
      </div>

      {loading ? (
        <div className="loading_box">
          <Spin size="large" />
        </div>
      ) : type === "VIDEO" ? (
        <div className="media_content">
          <div className="left_video">
            {items[0] && (
              <iframe
                src="https://www.youtube.com/embed/iuE-JPekxMI?autoplay=0"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Live"
              ></iframe>
            )}
          </div>

          <div className="right_list">
            {items.slice(1).map((item) => (
              <div
                key={item.id}
                className="video_item"
                onClick={() => goDetail(item.id)}
              >
                <img src={getImageUrl(item?.photo?.uuid)} alt="" />
                <div className="video_info">
                  <h4>{item?.title?.uz}</h4>
                  <p>👁 {item?.views}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="audio_content">
          {items.map((item) => (
            <div
              key={item.id}
              className="video_item"
              onClick={() => goDetail(item.id)}
            >
              <img src={getImageUrl(item?.photo?.uuid)} alt="" />
              <div className="video_info">
                <h4>{item?.title?.uz}</h4>
                <p>👁 {item?.views}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default MediaPage;